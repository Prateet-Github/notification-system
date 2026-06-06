import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenceDto } from './create-preference.dto';

export class UpdatePreferenceDto extends PartialType(CreatePreferenceDto) {}
