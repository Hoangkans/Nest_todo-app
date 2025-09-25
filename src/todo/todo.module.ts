import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import {
  Todo,
  TodoSchema,
} from 'src/shared/database/mongo/schemas/todo.schema';

@Module({
  imports: [
    // Đăng ký schema Todo với Mongoose
    // Sau khi đăng ký, ta có thể inject Model<Todo> ở service thông qua @InjectModel
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [
    // Controller chứa các route (API endpoint) liên quan đến Todo
    TodoController,
  ],
  providers: [
    // Service xử lý logic nghiệp vụ Todo
    TodoService,
  ],
})
export class TodoModule {}
