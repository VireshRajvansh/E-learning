import { BaseEntity } from './../../shared';

export class StripeCustomerManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public created?: any,
        public email?: string,
        public currency?: string,
        public stripeCustomerId?: string,
        public stripeSubscriptionId?: string,
        public stripeStatus?: string,
        public plan?: string,
        public ccBrand?: string,
        public ccLast4?: number,
        public expMonth?: string,
        public expYear?: string,
        public isCancelled?: boolean,
        public cardId?: string,
        public expectedExpiryDate?: any,
        public userId?: number,
        public studentId?: number,
        public teacherId?: number,
    ) {
        this.isCancelled = false;
    }
}
