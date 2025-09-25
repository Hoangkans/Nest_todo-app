# Todo List API

Ứng dụng quản lý công việc (Todo List) được xây dựng bằng NestJS và MongoDB.

## 🚀 Công nghệ sử dụng

- **Backend Framework**: NestJS
- **Database**: MongoDB (với Mongoose ODM)
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript

## 📋 Tính năng

- ✅ Tạo công việc mới
- ✅ Xem danh sách công việc (có phân trang và tìm kiếm)
- ✅ Xem chi tiết công việc
- ✅ Cập nhật công việc
- ✅ Xóa công việc
- ✅ Lọc theo trạng thái
- ✅ Tìm kiếm theo tiêu đề

## 🛠️ Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd to-do-list-app
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục gốc:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

### 4. Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

Server sẽ chạy tại: `http://localhost:3000`

## 📚 Danh sách API

### Base URL: `http://localhost:3000`

### 1. **GET** `/`

- **Mô tả**: Trang chủ
- **Response**: `"Hello World!"`

### 2. **POST** `/todos`

- **Mô tả**: Tạo công việc mới
- **Body**:
  ```json
  {
    "title": "string (bắt buộc, max 100 ký tự)",
    "content": "string (tùy chọn, max 500 ký tự)",
    "status": "pending | in_progress | done"
  }
  ```

### 3. **GET** `/todos`

- **Mô tả**: Lấy danh sách công việc (có phân trang + tìm kiếm)
- **Query params**:
  - `keyword`: Tìm kiếm theo tiêu đề
  - `status`: Lọc theo trạng thái (`pending`, `in_progress`, `done`)
  - `limit`: Số lượng/trang (mặc định: 10)
  - `offset`: Vị trí bắt đầu (mặc định: 0)
- **Ví dụ**: `/todos?keyword=nestjs&status=pending&limit=5&offset=0`

### 4. **GET** `/todos/:id`

- **Mô tả**: Lấy chi tiết công việc theo ID

### 5. **PATCH** `/todos/:id`

- **Mô tả**: Cập nhật công việc
- **Body**:
  ```json
  {
    "title": "string (tùy chọn)",
    "content": "string (tùy chọn)",
    "status": "pending | in_progress | done (tùy chọn)"
  }
  ```

### 6. **DELETE** `/todos/:id`

- **Mô tả**: Xóa công việc

## 📊 Cấu trúc dữ liệu

### Todo Schema

```typescript
{
  _id: ObjectId,           // ID tự động tạo
  title: string,           // Tiêu đề (bắt buộc, tối đa 100 ký tự)
  content: string,         // Nội dung (tùy chọn, tối đa 500 ký tự)
  status: TodoStatus,      // Trạng thái (pending | in_progress | done)
  createdAt: Date,         // Thời gian tạo
  updatedAt: Date          // Thời gian cập nhật
}
```

### Trạng thái công việc (TodoStatus)

- `pending`: Chưa làm
- `in_progress`: Đang làm
- `done`: Hoàn thành
