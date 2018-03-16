import { BaseEntity } from './../../shared';

export class CourseManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public shortDesc?: string,
        public categories?: string,
        public active?: boolean,
        public premium?: boolean,
        public courseHrs?: string,
        public tagLine?: string,
        public premiumTill?: any,
        public playlistId?: number,
        public userId?: number,
    ) {
        this.active = false;
        this.premium = false;
    }
}
