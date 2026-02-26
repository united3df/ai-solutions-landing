import { ApiProperty } from '@nestjs/swagger';

export class GenerateResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  score: number | null;
}
