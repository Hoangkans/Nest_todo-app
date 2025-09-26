// src/user/user.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  User,
  UserDocument,
} from 'src/shared/database/mongo/schemas/user.schema';
import { UpdateUserDto } from 'src/shared/database/mongo/dto/update-user.dto';
import { CreateUserDto } from 'src/shared/database/mongo/dto/create-user.dto';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    requester: User,
  ): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('❌ User không tồn tại');

    // Chỉ admin mới có quyền đổi role
    if (updateUserDto.role && requester.role !== UserRole.ADMIN) {
      throw new ForbiddenException('❌ Bạn không có quyền thay đổi role');
    }

    // Hash password nếu có update
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    await user.save();

    // Trả về user nhưng ẩn password
    const userObj = user.toObject<User>({
      versionKey: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userObj as Record<string, any>;
    return userWithoutPassword as User;
  }
}
