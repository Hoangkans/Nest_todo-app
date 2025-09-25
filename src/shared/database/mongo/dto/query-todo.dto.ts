import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { TodoStatus } from 'src/enums/todo-status.enum';

export class QueryTodoDto {
  @IsOptional()
  @IsString({ message: '❌ Từ khóa tìm kiếm phải là chuỗi' })
  keyword?: string;

  @IsOptional()
  @IsEnum(TodoStatus, {
    message: '❌ Trạng thái không hợp lệ (pending | in_progress | done)',
  })
  status?: TodoStatus;

  @IsOptional()
  @Type(() => Number) // 👈 ép string -> number
  @IsInt({ message: '❌ Limit phải là số nguyên' })
  @Min(1, { message: '❌ Limit tối thiểu là 1' })
  limit: number = 10; // default

  @IsOptional()
  @Type(() => Number) // 👈 ép string -> number
  @IsInt({ message: '❌ Offset phải là số nguyên' })
  @Min(0, { message: '❌ Offset tối thiểu là 0' })
  offset: number = 0; // default
}
