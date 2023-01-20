import { MoneyEntity } from './money.entity';

enum ActivityType {
  Payment = 'payment',
  Refund = 'refund',
}

export class ActivityEntity {
  constructor(
    private readonly _activityType: ActivityType,
    private readonly _timestamp: Date,
    private readonly _money: MoneyEntity,
  ) {}

  get activityType(): ActivityType {
    return this._activityType;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get money(): MoneyEntity {
    return this._money;
  }
}
