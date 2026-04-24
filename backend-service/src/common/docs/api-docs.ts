import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CronResponseDto } from '../../blog/dto/cron-response.dto';
import {
  PostListItemDto,
  PostFullDto,
  CreatePostDto,
  UpdatePostDto,
  AddTopicDto,
  TopicDto,
  StatsDto,
  GenerateResponseDto,
} from '../../admin/dto';

const CRON_HEADER = ApiHeader({
  name: 'x-cron-token',
  description: 'CRON_SECRET from env',
  required: true,
});

const ADMIN_HEADER = ApiHeader({
  name: 'x-admin-token',
  description: 'ADMIN_TOKEN from env',
  required: true,
});

export const CronPostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Run blog generation pipeline' }),
    CRON_HEADER,
    ApiResponse({ status: 200, type: CronResponseDto }),
    ApiResponse({ status: 401, description: 'Invalid or missing cron token' }),
  );

export const AdminListPostsDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'List all posts' }),
    ADMIN_HEADER,
    ApiResponse({ status: 200, type: [PostListItemDto] }),
  );

export const AdminCreatePostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create post (draft by default)' }),
    ADMIN_HEADER,
    ApiBody({ type: CreatePostDto }),
    ApiResponse({
      status: 201,
      schema: {
        type: 'object',
        properties: { success: { type: 'boolean' }, id: { type: 'number' } },
      },
    }),
    ApiResponse({ status: 400, description: 'Invalid body' }),
  );

export const AdminGetPostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get full post by id' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, type: PostFullDto }),
    ApiResponse({ status: 404, description: 'Post not found' }),
  );

export const AdminUpdatePostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update post' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiBody({ type: UpdatePostDto }),
    ApiResponse({ status: 200, schema: { type: 'object', properties: { success: { type: 'boolean' } } } }),
    ApiResponse({ status: 404, description: 'Post not found' }),
  );

export const AdminDeletePostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete post' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, schema: { type: 'object', properties: { success: { type: 'boolean' } } } }),
    ApiResponse({ status: 404, description: 'Post not found' }),
  );

export const AdminPublishPostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Set post status to published' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, schema: { type: 'object', properties: { success: { type: 'boolean' } } } }),
  );

export const AdminDraftPostDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Set post status to draft' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, schema: { type: 'object', properties: { success: { type: 'boolean' } } } }),
  );

export const AdminListTopicsDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'List all topics' }),
    ADMIN_HEADER,
    ApiResponse({ status: 200, type: [TopicDto] }),
  );

export const AdminAddTopicDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Add topic' }),
    ADMIN_HEADER,
    ApiBody({ type: AddTopicDto }),
    ApiResponse({ status: 201, schema: { type: 'object', properties: { success: { type: 'boolean' }, id: { type: 'number' } } } }),
  );

export const AdminDeleteTopicDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete topic' }),
    ADMIN_HEADER,
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, schema: { type: 'object', properties: { success: { type: 'boolean' } } } }),
  );

export const AdminGenerateDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Run generation (same as cron)' }),
    ADMIN_HEADER,
    ApiResponse({ status: 200, type: GenerateResponseDto }),
  );

export const AdminStatsDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get stats' }),
    ADMIN_HEADER,
    ApiResponse({ status: 200, type: StatsDto }),
  );
