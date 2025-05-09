export class SendMailDto<T> {
  readonly to: string;
  readonly subject: string;
  readonly template: string;
  readonly context: T;
}
