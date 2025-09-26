import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username không được để trống' })
  @IsString({ message: 'Username phải là chuỗi ký tự' })
  @MaxLength(50, { message: 'Username tối đa 50 ký tự' })
  username: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @IsString({ message: 'Password phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
  password: string;

  @IsEnum(UserRole, { message: 'Role không hợp lệ (user | admin)' })
  role: UserRole;
}
