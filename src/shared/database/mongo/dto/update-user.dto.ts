// src/user/dto/update-user.dto.ts
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Mật khẩu ít nhất 6 ký tự' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role không hợp lệ (user | admin)' })
  role?: UserRole;
}
