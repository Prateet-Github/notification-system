import { IsString } from 'class-validator';

export class CreatePushTokenDto {
  @IsString()
  userId!: string;

  @IsString()
  token!: string;
}