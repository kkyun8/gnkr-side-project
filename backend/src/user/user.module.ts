import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Follows } from './follows.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follows])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
