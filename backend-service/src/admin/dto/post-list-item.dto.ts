import { ApiProperty } from '@nestjs/swagger';

export class PostListItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ nullable: true })
  score: number | null;

  @ApiProperty()
  createdAt: string;
}
