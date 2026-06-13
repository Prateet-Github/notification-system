export abstract class SmsProvider {
  abstract send(
    to: string,
    subject: string,
    body: string,
  ): Promise<
    {
      provider: string;
      providerId: string;
    }>;
}