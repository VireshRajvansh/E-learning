import { BaseEntity } from './../../shared';

export class TaxRateManage implements BaseEntity {
    constructor(
        public id?: number,
        public displayName?: string,
        public totalTaxInPct?: number,
        public stateId?: number,
    ) {
    }
}
