import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    UserSignUpByReferralCodeManageService,
    UserSignUpByReferralCodeManagePopupService,
    UserSignUpByReferralCodeManageComponent,
    UserSignUpByReferralCodeManageDetailComponent,
    UserSignUpByReferralCodeManageDialogComponent,
    UserSignUpByReferralCodeManagePopupComponent,
    UserSignUpByReferralCodeManageDeletePopupComponent,
    UserSignUpByReferralCodeManageDeleteDialogComponent,
    userSignUpByReferralCodeRoute,
    userSignUpByReferralCodePopupRoute,
    UserSignUpByReferralCodeManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userSignUpByReferralCodeRoute,
    ...userSignUpByReferralCodePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserSignUpByReferralCodeManageComponent,
        UserSignUpByReferralCodeManageDetailComponent,
        UserSignUpByReferralCodeManageDialogComponent,
        UserSignUpByReferralCodeManageDeleteDialogComponent,
        UserSignUpByReferralCodeManagePopupComponent,
        UserSignUpByReferralCodeManageDeletePopupComponent,
    ],
    entryComponents: [
        UserSignUpByReferralCodeManageComponent,
        UserSignUpByReferralCodeManageDialogComponent,
        UserSignUpByReferralCodeManagePopupComponent,
        UserSignUpByReferralCodeManageDeleteDialogComponent,
        UserSignUpByReferralCodeManageDeletePopupComponent,
    ],
    providers: [
        UserSignUpByReferralCodeManageService,
        UserSignUpByReferralCodeManagePopupService,
        UserSignUpByReferralCodeManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningUserSignUpByReferralCodeManageModule {}
