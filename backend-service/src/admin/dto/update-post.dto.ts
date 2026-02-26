import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional()
  title?: string;

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
}
