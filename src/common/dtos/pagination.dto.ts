import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  // * Conversion del valor a numero mediante NUMBER de javascript
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsPositive()
  // * Conversion del valor a numero mediante NUMBER de javascript
  @Type(() => Number)
  offset?: number;
}
