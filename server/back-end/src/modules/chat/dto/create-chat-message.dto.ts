import { IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  username: string;

  @IsString()
  content: string;
}