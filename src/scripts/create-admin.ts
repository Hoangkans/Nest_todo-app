// src/scripts/create-admin.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { UserRole } from '../enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  try {
    // Tạo admin user
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: UserRole.ADMIN,
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Tạo user admin
    const admin = await userService.create({
      ...adminData,
      password: hashedPassword,
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Password: admin123');
    console.log('\n🔐 You can now login with these credentials');
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      console.log('⚠️  Admin user already exists!');
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Error creating admin user:', errorMessage);
    }
  } finally {
    await app.close();
  }
}

createAdmin().catch(console.error);
