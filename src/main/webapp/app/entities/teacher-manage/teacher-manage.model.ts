import { BaseEntity } from './../../shared';

export class TeacherManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public about?: string,
        public imageUrl?: string,
        public collegeYear?: number,
        public dob?: any,
        public mobile?: string,
        public alternativeMobile?: string,
        public premium?: boolean,
        public active?: boolean,
        public languagesSpoken?: string,
        public slug?: string,
        public premiumTill?: any,
        public referenceCode?: string,
        public signUpByReferenceCode?: string,
        public websiteURL?: string,
        public twitter?: string,
        public facebook?: string,
        public googlePlus?: string,
        public linkedIn?: string,
        public stripeCustomerId?: number,
        public userId?: number,
        public addressId?: number,
        public collegeId?: number,
    ) {
        this.premium = false;
        this.active = false;
    }
}
