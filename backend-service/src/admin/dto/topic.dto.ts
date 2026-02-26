import { ApiProperty } from '@nestjs/swagger';

export class TopicDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  keyword: string | null;

  @ApiProperty({ nullable: true })
  intent: string | null;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  used: boolean;

  @ApiProperty()
  created_at: string;
}
