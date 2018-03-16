import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    StripePaymentManageService,
    StripePaymentManagePopupService,
    StripePaymentManageComponent,
    StripePaymentManageDetailComponent,
    StripePaymentManageDialogComponent,
    StripePaymentManagePopupComponent,
    StripePaymentManageDeletePopupComponent,
    StripePaymentManageDeleteDialogComponent,
    stripePaymentRoute,
    stripePaymentPopupRoute,
    StripePaymentManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stripePaymentRoute,
    ...stripePaymentPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StripePaymentManageComponent,
        StripePaymentManageDetailComponent,
        StripePaymentManageDialogComponent,
        StripePaymentManageDeleteDialogComponent,
        StripePaymentManagePopupComponent,
        StripePaymentManageDeletePopupComponent,
    ],
    entryComponents: [
        StripePaymentManageComponent,
        StripePaymentManageDialogComponent,
        StripePaymentManagePopupComponent,
        StripePaymentManageDeleteDialogComponent,
        StripePaymentManageDeletePopupComponent,
    ],
    providers: [
        StripePaymentManageService,
        StripePaymentManagePopupService,
        StripePaymentManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripePaymentManageModule {}
