import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TodoStatus } from 'src/enums/todo-status.enum';

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Nội dung phải là chuỗi' })
  content?: string;

  @IsOptional()
  @IsEnum(TodoStatus, { message: 'Trạng thái không hợp lệ' })
  status?: TodoStatus;
}
