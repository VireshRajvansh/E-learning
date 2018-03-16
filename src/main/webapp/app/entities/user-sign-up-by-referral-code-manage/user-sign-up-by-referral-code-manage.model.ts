import { BaseEntity } from './../../shared';

export class UserSignUpByReferralCodeManage implements BaseEntity {
    constructor(
        public id?: number,
        public referralCode?: string,
        public userId?: number,
    ) {
    }
}
