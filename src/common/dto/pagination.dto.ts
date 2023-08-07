import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // * Parsea el string de los query a numero
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number) // * Parsea el string de los query a numero
  offset?: number;
}
