import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from 'src/dto/tag';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}
  @Get()
  readTags() {
    return this.service.readTags();
  }

  @Post()
  createTag(@Body() data: TagDto) {
    return this.service.createTag(data);
  }

  @Put(':id')
  updateTag(@Param('id') id: number, @Body() data: TagDto) {
    return this.service.updateTag(id, data);
  }

  @Delete(':id')
  deleteTag(@Param('id') id) {
    return this.service.deleteTag(id);
  }
}
