import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Todo,
  TodoDocument,
} from 'src/shared/database/mongo/schemas/todo.schema';
import { CreateTodoDto } from 'src/shared/database/mongo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/shared/database/mongo/dto/update-todo.dto';
import { QueryTodoDto } from 'src/shared/database/mongo/dto/query-todo.dto';

@Injectable()
export class TodoService {
  // Inject model Todo từ Mongoose vào service
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  /**
   * Tạo mới một công việc (Todo)
   * @param createTodoDto dữ liệu đầu vào (title, content)
   * @param user user hiện tại
   * @returns Todo vừa được tạo
   */
  async create(createTodoDto: CreateTodoDto, user: any): Promise<Todo> {
    const todo = new this.todoModel({
      ...createTodoDto,
      userId: user._id,
    });
    return todo.save();
  }

  /**
   * Lấy danh sách công việc (có hỗ trợ tìm kiếm + phân trang)
   * @param query tham số query (keyword, status, limit, offset)
   * @param user user hiện tại
   * @returns danh sách công việc + meta (phân trang)
   */
  async findAll(query: QueryTodoDto, user: any) {
    const { keyword, status, limit, offset } = query;

    // Tạo object filter để tìm kiếm theo status và keyword
    const filter: { [key: string]: any } = { userId: user._id };
    if (status) filter.status = status;
    if (keyword) filter.title = { $regex: keyword, $options: 'i' }; // tìm kiếm theo title, không phân biệt hoa/thường

    // Thực hiện query song song: lấy dữ liệu + tổng số bản ghi
    const [items, total] = await Promise.all([
      this.todoModel.find(filter).skip(offset).limit(limit).exec(),
      this.todoModel.countDocuments(filter),
    ]);

    // Trả về dữ liệu theo format yêu cầu
    return {
      statusCode: 200,
      data: {
        items,
        meta: {
          limit,
          offset,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  /**
   * Lấy chi tiết một công việc theo id
   * @param id id của Todo
   * @param user user hiện tại
   * @returns thông tin Todo
   */
  async findOne(id: string, user: any): Promise<Todo> {
    const todo = await this.todoModel
      .findOne({ _id: id, userId: user._id })
      .exec();
    if (!todo) throw new NotFoundException('Không tìm thấy công việc');
    return todo;
  }

  /**
   * Cập nhật công việc theo id
   * @param id id của Todo
   * @param updateTodoDto dữ liệu cần cập nhật
   * @param user user hiện tại
   * @returns Todo sau khi cập nhật
   */
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    user: any,
  ): Promise<Todo> {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      updateTodoDto,
      { new: true }, // trả về dữ liệu sau khi update
    );
    if (!todo) throw new NotFoundException('Không tìm thấy công việc');
    return todo;
  }

  /**
   * Xóa công việc theo id
   * @param id id của Todo
   * @param user user hiện tại
   */
  async remove(id: string, user: any): Promise<void> {
    const result = await this.todoModel
      .findOneAndDelete({ _id: id, userId: user._id })
      .exec();
    if (!result) throw new NotFoundException('Không tìm thấy công việc');
  }
}
