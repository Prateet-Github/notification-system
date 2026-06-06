import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) { }

  @Post()
  create(@Body() dto: CreatePreferenceDto) {
    return this.preferencesService.create(dto);
  }
}
