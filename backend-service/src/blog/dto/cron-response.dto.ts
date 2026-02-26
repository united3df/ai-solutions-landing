import { ApiProperty } from '@nestjs/swagger';

export class CronResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'my-post-slug', required: false })
  slug?: string;

  @ApiProperty({ example: 8, required: false })
  score?: number;

  @ApiProperty({ example: 'Error message', required: false })
  error?: string;
}
