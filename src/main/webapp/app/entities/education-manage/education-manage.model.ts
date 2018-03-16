import { BaseEntity } from './../../shared';

export class EducationManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
