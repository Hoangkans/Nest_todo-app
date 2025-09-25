import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // Load biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Kết nối MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('❌ Không tìm thấy biến môi trường MONGO_URI');
        }
        return { uri };
      },
    }),

    // Import module Todo
    TodoModule,
  ],
})
export class AppModule {}
