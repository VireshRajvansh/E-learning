import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    CardExpiryReminderManageService,
    CardExpiryReminderManagePopupService,
    CardExpiryReminderManageComponent,
    CardExpiryReminderManageDetailComponent,
    CardExpiryReminderManageDialogComponent,
    CardExpiryReminderManagePopupComponent,
    CardExpiryReminderManageDeletePopupComponent,
    CardExpiryReminderManageDeleteDialogComponent,
    cardExpiryReminderRoute,
    cardExpiryReminderPopupRoute,
    CardExpiryReminderManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cardExpiryReminderRoute,
    ...cardExpiryReminderPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardExpiryReminderManageComponent,
        CardExpiryReminderManageDetailComponent,
        CardExpiryReminderManageDialogComponent,
        CardExpiryReminderManageDeleteDialogComponent,
        CardExpiryReminderManagePopupComponent,
        CardExpiryReminderManageDeletePopupComponent,
    ],
    entryComponents: [
        CardExpiryReminderManageComponent,
        CardExpiryReminderManageDialogComponent,
        CardExpiryReminderManagePopupComponent,
        CardExpiryReminderManageDeleteDialogComponent,
        CardExpiryReminderManageDeletePopupComponent,
    ],
    providers: [
        CardExpiryReminderManageService,
        CardExpiryReminderManagePopupService,
        CardExpiryReminderManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCardExpiryReminderManageModule {}
