import { BaseEntity } from './../../shared';

export class StripeTransactionManage implements BaseEntity {
    constructor(
        public id?: number,
        public stripResponse?: string,
    ) {
    }
}
