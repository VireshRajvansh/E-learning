import { BaseEntity } from './../../shared';

export class OfferManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}