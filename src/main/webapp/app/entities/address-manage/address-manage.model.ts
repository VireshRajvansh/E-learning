import { BaseEntity } from './../../shared';

export class AddressManage implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public zipCode?: string,
        public city?: string,
        public state?: string,
        public landmark?: string,
        public country?: string,
        public lat?: number,
        public lng?: number,
    ) {
    }
}
