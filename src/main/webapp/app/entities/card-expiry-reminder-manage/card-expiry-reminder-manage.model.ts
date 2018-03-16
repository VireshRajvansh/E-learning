import { BaseEntity } from './../../shared';

export class CardExpiryReminderManage implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public messageType?: string,
        public sendOnDate?: any,
        public isComplete?: boolean,
        public refData?: string,
    ) {
        this.isComplete = false;
    }
}
