import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  from: string;
  @IsUUID()
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
