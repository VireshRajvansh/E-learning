import { BaseEntity } from './../../shared';

export class JobsManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public runon?: any,
        public type?: string,
        public cronExpress?: string,
        public isComplete?: boolean,
        public msg?: string,
    ) {
        this.isComplete = false;
    }
}
