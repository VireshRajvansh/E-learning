import { BaseEntity } from './../../shared';

export class EducationCollegeManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public students?: BaseEntity[],
        public teachers?: BaseEntity[],
    ) {
    }
}
