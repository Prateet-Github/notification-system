export const QUEUES = {
  EMAIL: 'email-queue',
  SMS: 'sms-queue',
  PUSH: 'push-queue',
  IN_APP: 'inapp-queue',
} as const;

export const PRIORITIES = {
  HIGH: 1,
  MEDIUM: 5,
  LOW: 10,
} as const;