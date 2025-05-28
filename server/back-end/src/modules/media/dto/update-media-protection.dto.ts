import { IsBoolean } from 'class-validator';

export class UpdateMediaProtectionDto {
  @IsBoolean()
  isProtected: boolean;
}