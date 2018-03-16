import { BaseEntity } from './../../shared';

export class ArticleManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public slug?: string,
        public type?: string,
        public tagLine?: string,
        public categories?: string,
        public active?: boolean,
        public userId?: number,
    ) {
        this.active = false;
    }
}
