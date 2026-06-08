# Notification System

A scalable notification service built with NestJS, Prisma, PostgreSQL, Redis, and BullMQ.

## Features

- Multi-channel notifications
  - Email
  - SMS
  - Push
  - In-App
- User notification preferences
- Delivery tracking
- Priority-based processing
- Queue-driven architecture
- Delivery-level retries

## Tech Stack

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis
- BullMQ

## Architecture

```text
Notification API
        ↓
Create Notification
        ↓
Create Deliveries
        ↓
Queue Routing

email-queue
sms-queue
push-queue
inapp-queue

        ↓

Workers
        ↓

Providers
        ↓

External Channels
```

## Status

Work in Progress

### Current Progress

- Notification creation
- Delivery record creation
- User preferences
- Redis setup
- BullMQ setup
- Queue architecture design

### Next Steps

- Queue routing
- Workers
- Channel providers
- Retry mechanism
- Dead Letter Queues (DLQ)
- Observability & metrics
