import { ApiProperty } from '@nestjs/swagger';

export class PostFullDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  metaDesc: string;

  @ApiProperty({ nullable: true })
  keyword: string | null;

  @ApiProperty()
  createdAt: string;
}
