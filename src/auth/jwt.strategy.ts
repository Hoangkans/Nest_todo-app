import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadUser } from './interfaces/jwt-payload-user.interface';

export interface JwtPayload {
  sub: string; // userId
  role: string; // role của user
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'changeme',
    });
  }

  validate(payload: JwtPayload): JwtPayloadUser {
    return { userId: payload.sub, role: payload.role };
  }
}
