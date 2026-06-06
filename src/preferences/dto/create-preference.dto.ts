export class CreatePreferenceDto {
  userId!: string;
  email!: boolean;
  sms!: boolean;
  push!: boolean;
  inApp!: boolean;
}