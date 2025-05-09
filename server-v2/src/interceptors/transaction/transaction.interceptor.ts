import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { catchError, Observable, map } from 'rxjs';
import { Transaction } from 'sequelize';
import { SEQUELIZE } from './constants';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelizeInstance: Sequelize,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest();
    const transaction: Transaction = await this.sequelizeInstance.transaction();

    req.transaction = transaction;

    return next.handle().pipe(
      map(async (data) => {
        await transaction.commit();

        return data;
      }),
      catchError(async (error) => {
        await transaction.rollback();
        throw error;
      }),
    );
  }
}
