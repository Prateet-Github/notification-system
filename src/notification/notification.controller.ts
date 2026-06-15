import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string) {
    return this.notificationService.findByUser(
      userId,
    );
  }

  @Patch(':deliveryId/read')
  markAsRead(
    @Param('deliveryId') deliveryId: string,
  ) {
    return this.notificationService.markAsRead(
      deliveryId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }
}
