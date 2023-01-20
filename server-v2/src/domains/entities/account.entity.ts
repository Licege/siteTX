import { MoneyEntity } from './money.entity';

type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _balance: MoneyEntity,
    private readonly _activityWindow: null,
  ) {}
}
