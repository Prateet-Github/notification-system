import { PartialType } from '@nestjs/mapped-types';
import { CreatePushTokenDto } from './create-push-token.dto';

export class UpdatePushTokenDto extends PartialType(CreatePushTokenDto) {}
