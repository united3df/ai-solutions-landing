import { ApiProperty } from '@nestjs/swagger';

export class StatsDto {
  @ApiProperty()
  totalPosts: number;

  @ApiProperty()
  publishedPosts: number;

  @ApiProperty()
  draftPosts: number;

  @ApiProperty()
  unusedTopics: number;
}
