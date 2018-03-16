import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    StripeTransactionManageService,
    StripeTransactionManagePopupService,
    StripeTransactionManageComponent,
    StripeTransactionManageDetailComponent,
    StripeTransactionManageDialogComponent,
    StripeTransactionManagePopupComponent,
    StripeTransactionManageDeletePopupComponent,
    StripeTransactionManageDeleteDialogComponent,
    stripeTransactionRoute,
    stripeTransactionPopupRoute,
    StripeTransactionManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stripeTransactionRoute,
    ...stripeTransactionPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StripeTransactionManageComponent,
        StripeTransactionManageDetailComponent,
        StripeTransactionManageDialogComponent,
        StripeTransactionManageDeleteDialogComponent,
        StripeTransactionManagePopupComponent,
        StripeTransactionManageDeletePopupComponent,
    ],
    entryComponents: [
        StripeTransactionManageComponent,
        StripeTransactionManageDialogComponent,
        StripeTransactionManagePopupComponent,
        StripeTransactionManageDeleteDialogComponent,
        StripeTransactionManageDeletePopupComponent,
    ],
    providers: [
        StripeTransactionManageService,
        StripeTransactionManagePopupService,
        StripeTransactionManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripeTransactionManageModule {}
