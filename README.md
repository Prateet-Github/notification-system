Notification System

A scalable, multi-channel notification platform built with NestJS, PostgreSQL, Redis, BullMQ, and Prisma.

Features

* Multi-channel notification delivery
    * Email (Resend)
    * SMS (Twilio)
    * Push Notifications
    * In-App Notifications
* User notification preferences
* Notification history
* Read / Unread tracking
* Unread notification counts
* Priority-based processing
* Queue-driven architecture
* Delivery-level retries
* Real-time notifications using Server-Sent Events (SSE)
* Redis Pub/Sub for cross-instance event propagation
* Horizontal scaling support
* Nginx load balancing

Tech Stack

* NestJS
* TypeScript
* Prisma
* PostgreSQL
* Redis
* BullMQ
* Server-Sent Events (SSE)
* Nginx
* Resend
* Twilio

Architecture

                        Nginx
                  (Load Balancer)
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
    NestJS #1           NestJS #2           NestJS #3
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                          Redis
                  Pub/Sub + BullMQ
                             │
                        Queue Router
                             │
      email-queue  sms-queue  push-queue  inapp-queue
            │          │           │            │
            ▼          ▼           ▼            ▼
      EmailWorker SMSWorker PushWorker InAppWorker
            │          │           │            │
            ▼          ▼           ▼            ▼
        Resend      Twilio       FCM          SSE

Current Progress

Core Platform

* Notification creation
* Delivery record creation
* User preferences
* Delivery tracking
* Priority handling
* Retry mechanism

In-App Notifications

* SSE-based real-time delivery
* Notification history
* Read / Unread state management
* Unread count tracking
* Redis Pub/Sub integration
* Multi-instance event delivery

Email

* Resend integration
* HTML email templates
* Provider response tracking

SMS

* Twilio integration
* Provider response tracking

Infrastructure

* Redis integration
* BullMQ queue processing
* Dedicated workers per channel
* Horizontal scaling support
* Nginx reverse proxy and load balancing
* SSE proxy optimization

Roadmap

* Push Notifications (Firebase Cloud Messaging)
* Dead Letter Queues (DLQ)
* Idempotency
* Rate Limiting
* Delivery Metrics & Observability
* Distributed Tracing

Status

Work in Progress