import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    StripeCustomerManageService,
    StripeCustomerManagePopupService,
    StripeCustomerManageComponent,
    StripeCustomerManageDetailComponent,
    StripeCustomerManageDialogComponent,
    StripeCustomerManagePopupComponent,
    StripeCustomerManageDeletePopupComponent,
    StripeCustomerManageDeleteDialogComponent,
    stripeCustomerRoute,
    stripeCustomerPopupRoute,
    StripeCustomerManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stripeCustomerRoute,
    ...stripeCustomerPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StripeCustomerManageComponent,
        StripeCustomerManageDetailComponent,
        StripeCustomerManageDialogComponent,
        StripeCustomerManageDeleteDialogComponent,
        StripeCustomerManagePopupComponent,
        StripeCustomerManageDeletePopupComponent,
    ],
    entryComponents: [
        StripeCustomerManageComponent,
        StripeCustomerManageDialogComponent,
        StripeCustomerManagePopupComponent,
        StripeCustomerManageDeleteDialogComponent,
        StripeCustomerManageDeletePopupComponent,
    ],
    providers: [
        StripeCustomerManageService,
        StripeCustomerManagePopupService,
        StripeCustomerManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStripeCustomerManageModule {}
