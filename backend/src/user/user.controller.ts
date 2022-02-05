import {
  Controller,
  Delete,
  Post,
  Put,
  Param,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, getLoginId } from 'src/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser(@Body() data: UserDto) {
    return this.service.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  readUser(@Request() req, @Param('id') id) {
    const loginId = getLoginId(req);

    return this.service.readUser(id, loginId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: UserDto) {
    return this.service.updateUser(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.service.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/follow/:followId')
  follow(@Request() req, @Param('followId') followId: number) {
    const loginId = getLoginId(req);

    return this.service.follow(loginId, followId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/follow/:followId')
  unFollow(@Request() req, @Param('followId') followId: number) {
    const loginId = getLoginId(req);

    return this.service.unFollow(loginId, followId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/follow')
  readFollow(@Request() req) {
    const loginId = getLoginId(req);

    return this.service.readFollow(loginId);
  }
}
