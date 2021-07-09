import {
  Controller,
  Delete,
  Post,
  Put,
  Param,
  Body,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser(@Body() data: UserDto) {
    return this.service.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: UserDto) {
    return this.service.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.service.deleteUser(id);
  }

  @Post('/login')
  login(@Body() data: UserDto) {
    return this.service.login(data);
  }

  @Post('/:loginId/follow/:followId')
  follow(
    @Param('loginId') loginId: number,
    @Param('followId') followId: number,
  ) {
    return this.service.follow(loginId, followId);
  }

  @Delete('/:loginId/follow/:followId')
  unFollow(
    @Param('loginId') loginId: number,
    @Param('followId') followId: number,
  ) {
    return this.service.unFollow(loginId, followId);
  }

  @Get('follow/:loginId')
  readFollow(@Param('loginId') loginId: number) {
    return this.service.readFollow(loginId);
  }
}
