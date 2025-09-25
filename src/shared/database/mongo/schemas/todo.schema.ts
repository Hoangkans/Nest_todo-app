import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from 'src/enums/todo-status.enum';
export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: String, enum: TodoStatus, default: TodoStatus.PENDING })
  status: TodoStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
