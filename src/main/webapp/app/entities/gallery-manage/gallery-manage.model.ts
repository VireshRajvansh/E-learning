import { BaseEntity } from './../../shared';

export class GalleryManage implements BaseEntity {
    constructor(
        public id?: number,
        public imageUrl?: string,
        public galleryGroupId?: number,
    ) {
    }
}
