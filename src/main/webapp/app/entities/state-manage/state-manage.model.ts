import { BaseEntity } from './../../shared';

export class StateManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public cities?: BaseEntity[],
    ) {
    }
}
