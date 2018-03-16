import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    OfferManageService,
    OfferManagePopupService,
    OfferManageComponent,
    OfferManageDetailComponent,
    OfferManageDialogComponent,
    OfferManagePopupComponent,
    OfferManageDeletePopupComponent,
    OfferManageDeleteDialogComponent,
    offerRoute,
    offerPopupRoute,
    OfferManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...offerRoute,
    ...offerPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OfferManageComponent,
        OfferManageDetailComponent,
        OfferManageDialogComponent,
        OfferManageDeleteDialogComponent,
        OfferManagePopupComponent,
        OfferManageDeletePopupComponent,
    ],
    entryComponents: [
        OfferManageComponent,
        OfferManageDialogComponent,
        OfferManagePopupComponent,
        OfferManageDeleteDialogComponent,
        OfferManageDeletePopupComponent,
    ],
    providers: [
        OfferManageService,
        OfferManagePopupService,
        OfferManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningOfferManageModule {}
