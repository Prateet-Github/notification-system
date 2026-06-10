export abstract class InAppProvider {
  abstract send(
    to: string,
    subject: string,
    body: string,
  ): Promise<void>;
}