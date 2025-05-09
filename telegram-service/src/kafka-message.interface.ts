export interface KafkaMessageInterface<T> {
  topic: string;
  partition: number;
  timestamp: string;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}
