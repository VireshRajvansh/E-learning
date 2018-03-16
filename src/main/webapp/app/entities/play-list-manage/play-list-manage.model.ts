import { BaseEntity } from './../../shared';

export class PlayListManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public length?: number,
        public duration?: string,
        public tagLine?: string,
        public active?: boolean,
    ) {
        this.active = false;
    }
}
