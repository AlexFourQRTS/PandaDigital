import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateMediaFileDto {
  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsString()
  mimeType: string;

  @IsNumber()
  size: number;

  @IsString()
  type: string;

  @IsBoolean()
  @IsOptional()
  isProtected?: boolean;
}