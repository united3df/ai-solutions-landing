import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminAuthGuard } from '../common/guards/admin-auth.guard';
import {
  AdminListPostsDocs,
  AdminCreatePostDocs,
  AdminGetPostDocs,
  AdminUpdatePostDocs,
  AdminDeletePostDocs,
  AdminPublishPostDocs,
  AdminDraftPostDocs,
  AdminListTopicsDocs,
  AdminAddTopicDocs,
  AdminDeleteTopicDocs,
  AdminGenerateDocs,
  AdminStatsDocs,
} from '../common/docs/api-docs';
import { CreatePostDto, UpdatePostDto, AddTopicDto } from './dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('posts')
  @AdminListPostsDocs()
  async listPosts() {
    return this.admin.listPosts();
  }

  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  @AdminCreatePostDocs()
  async createPost(@Body() body: CreatePostDto) {
    const { id } = await this.admin.createPost(body);
    return { success: true, id };
  }

  @Get('posts/:id')
  @AdminGetPostDocs()
  async getPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.admin.getPostOrThrow(id);
    return post;
  }

  @Put('posts/:id')
  @AdminUpdatePostDocs()
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    await this.admin.updatePost(id, body);
    return { success: true };
  }

  @Delete('posts/:id')
  @AdminDeletePostDocs()
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    await this.admin.deletePost(id);
    return { success: true };
  }

  @Post('posts/:id/publish')
  @AdminPublishPostDocs()
  async publishPost(@Param('id', ParseIntPipe) id: number) {
    await this.admin.publishPost(id);
    return { success: true };
  }

  @Post('posts/:id/draft')
  @AdminDraftPostDocs()
  async draftPost(@Param('id', ParseIntPipe) id: number) {
    await this.admin.draftPost(id);
    return { success: true };
  }

  @Get('topics')
  @AdminListTopicsDocs()
  async listTopics() {
    return this.admin.listTopics();
  }

  @Post('topics')
  @AdminAddTopicDocs()
  async addTopic(@Body() body: AddTopicDto) {
    const id = await this.admin.addTopic(body);
    return { success: true, id };
  }

  @Delete('topics/:id')
  @AdminDeleteTopicDocs()
  async deleteTopic(@Param('id', ParseIntPipe) id: number) {
    await this.admin.deleteTopic(id);
    return { success: true };
  }

  @Post('generate')
  @AdminGenerateDocs()
  async generate() {
    const result = await this.admin.generatePost();
    return { success: true, ...result };
  }

  @Get('stats')
  @AdminStatsDocs()
  async stats() {
    return this.admin.getStats();
  }
}
