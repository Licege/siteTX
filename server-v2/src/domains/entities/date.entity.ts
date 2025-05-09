import * as dateFns from 'date-fns';
import ms, { StringValue } from 'ms';

export class DateEntity {
  constructor(private readonly _date: Date) {}

  static of(value?: Date | string | number | null) {
    return new DateEntity(new Date(value));
  }

  static getTime(date: StringValue): number {
    return ms(date);
  }

  static isPast(date: Date | number | string) {
    return dateFns.isPast(new Date(date));
  }

  private compareAsc(date: Date): number {
    return dateFns.compareAsc(this._date, date);
  }

  moreThan(date?: Date | string | number | null): boolean {
    return this.compareAsc(new Date(date)) === 1;
  }

  moreThanOrEqual(date?: Date | string | number | null): boolean {
    const result = this.compareAsc(new Date(date));

    return result >= 0;
  }

  valid(): boolean {
    return dateFns.isValid(new Date(this._date));
  }

  get date(): Date {
    return this._date;
  }
}
