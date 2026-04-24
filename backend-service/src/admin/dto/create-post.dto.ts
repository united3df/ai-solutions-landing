import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  slug?: string;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  excerpt?: string;

  @ApiPropertyOptional({ enum: ['published', 'draft'] })
  status?: string;

  @ApiPropertyOptional()
  meta_title?: string;

  @ApiPropertyOptional()
  meta_desc?: string;

  @ApiPropertyOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  metaDesc?: string;

  @ApiPropertyOptional()
  keyword?: string | null;
}
