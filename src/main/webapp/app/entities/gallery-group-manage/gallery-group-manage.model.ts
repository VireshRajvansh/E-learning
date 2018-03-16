import { BaseEntity } from './../../shared';

export class GalleryGroupManage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public galleries?: BaseEntity[],
    ) {
    }
}
