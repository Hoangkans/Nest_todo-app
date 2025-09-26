import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: ' Username không được để trống' })
  username: string;

  @IsEmail({}, { message: ' Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: ' Password không được để trống' })
  @MinLength(6, { message: ' Password phải có ít nhất 6 ký tự' })
  password: string;
}
