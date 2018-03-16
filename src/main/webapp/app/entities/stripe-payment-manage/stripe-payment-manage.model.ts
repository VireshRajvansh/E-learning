import { BaseEntity } from './../../shared';

export class StripePaymentManage implements BaseEntity {
    constructor(
        public id?: number,
        public stripeCustomerId?: string,
        public invoiceId?: string,
        public planId?: string,
        public planName?: string,
        public charge?: string,
        public created?: any,
        public amount?: number,
        public planAmount?: number,
        public planCreated?: any,
        public planCurrency?: string,
        public planInterval?: string,
        public planIntervalCount?: number,
        public liveMode?: boolean,
        public paid?: boolean,
        public periodEnd?: any,
        public periodStart?: any,
        public subscriptionValue?: string,
        public subtotal?: number,
        public tax?: string,
        public taxPercent?: string,
        public taxDisplayName?: string,
        public total?: number,
        public currency?: string,
        public stripeCode?: string,
        public isSuccess?: boolean,
        public invoiceNumber?: string,
        public userId?: number,
    ) {
        this.liveMode = false;
        this.paid = false;
        this.isSuccess = false;
    }
}
