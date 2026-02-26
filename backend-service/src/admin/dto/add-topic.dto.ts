import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddTopicDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  keyword?: string;

  @ApiPropertyOptional({ default: 5 })
  priority?: number;
}
