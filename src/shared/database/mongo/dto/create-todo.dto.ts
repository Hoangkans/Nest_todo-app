import { IsNotEmpty, IsString, IsEnum, MaxLength } from 'class-validator';
import { TodoStatus } from 'src/enums/todo-status.enum';

export class CreateTodoDto {
  @IsNotEmpty({ message: '❌ Tiêu đề không được để trống' })
  @IsString({ message: '❌ Tiêu đề phải là chuỗi ký tự' })
  @MaxLength(100, { message: '❌ Tiêu đề tối đa 100 ký tự' })
  title: string;

  @IsString({ message: '❌ Nội dung phải là chuỗi ký tự' })
  @MaxLength(500, { message: '❌ Nội dung tối đa 500 ký tự' })
  content?: string;

  @IsEnum(TodoStatus, {
    message: '❌ Trạng thái không hợp lệ (pending | in_progress | done)',
  })
  status: TodoStatus;
}
