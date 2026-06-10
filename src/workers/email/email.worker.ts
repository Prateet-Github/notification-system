import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { PrismaService } from '../../prisma/prisma.service';
import { QUEUES } from '../../queue/constants';
import { Status } from '@prisma/client';

@Injectable()
@Processor(QUEUES.EMAIL)
export class EmailWorker extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<{ deliveryId: string }>): Promise<void> {
    const { deliveryId } = job.data;

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.SENT,
      },
    });

    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id: deliveryId,
      },
    });

    console.log('Email job received:', deliveryId);
    console.log('Delivery:', delivery);
  }
}