// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  User,
  UserDocument,
} from 'src/shared/database/mongo/schemas/user.schema';
import { RegisterDto } from 'src/shared/database/mongo/dto/register.dto';
import { LoginDto } from 'src/shared/database/mongo/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashed,
    });
    return user.save();
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) throw new UnauthorizedException('❌ User không tồn tại');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('❌ Sai mật khẩu');

    const payload = { sub: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
