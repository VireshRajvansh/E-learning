import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    AddressManageService,
    AddressManagePopupService,
    AddressManageComponent,
    AddressManageDetailComponent,
    AddressManageDialogComponent,
    AddressManagePopupComponent,
    AddressManageDeletePopupComponent,
    AddressManageDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
    AddressManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressManageComponent,
        AddressManageDetailComponent,
        AddressManageDialogComponent,
        AddressManageDeleteDialogComponent,
        AddressManagePopupComponent,
        AddressManageDeletePopupComponent,
    ],
    entryComponents: [
        AddressManageComponent,
        AddressManageDialogComponent,
        AddressManagePopupComponent,
        AddressManageDeleteDialogComponent,
        AddressManageDeletePopupComponent,
    ],
    providers: [
        AddressManageService,
        AddressManagePopupService,
        AddressManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningAddressManageModule {}
