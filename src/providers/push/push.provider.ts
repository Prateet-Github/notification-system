export abstract class PushProvider {
  abstract send(
    to: string,
    subject: string,
    body: string,
  ): Promise<void>;
}