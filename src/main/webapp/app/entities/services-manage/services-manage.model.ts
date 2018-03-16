import { BaseEntity } from './../../shared';

export class ServicesManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
