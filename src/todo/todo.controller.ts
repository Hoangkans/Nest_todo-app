import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/shared/database/mongo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/shared/database/mongo/dto/update-todo.dto';
import { QueryTodoDto } from 'src/shared/database/mongo/dto/query-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: Request & { user?: any },
  ) {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  findAll(@Query() query: QueryTodoDto, @Req() req: Request & { user?: any }) {
    return this.todoService.findAll(query, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request & { user?: any }) {
    return this.todoService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: Request & { user?: any },
  ) {
    return this.todoService.update(id, updateTodoDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user?: any }) {
    return this.todoService.remove(id, req.user);
  }
}
