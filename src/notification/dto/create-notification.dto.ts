import { IsEnum, IsObject, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId!: string;

  @IsString()
  eventType!: string;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority!: 'LOW' | 'MEDIUM' | 'HIGH';

  @IsObject()
  payload!: Record<string, any>;
}