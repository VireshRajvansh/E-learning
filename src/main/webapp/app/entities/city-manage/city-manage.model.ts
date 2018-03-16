import { BaseEntity } from './../../shared';

export class CityManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public stateId?: number,
    ) {
    }
}
