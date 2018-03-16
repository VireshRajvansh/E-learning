import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    JobsManageService,
    JobsManagePopupService,
    JobsManageComponent,
    JobsManageDetailComponent,
    JobsManageDialogComponent,
    JobsManagePopupComponent,
    JobsManageDeletePopupComponent,
    JobsManageDeleteDialogComponent,
    jobsRoute,
    jobsPopupRoute,
    JobsManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...jobsRoute,
    ...jobsPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobsManageComponent,
        JobsManageDetailComponent,
        JobsManageDialogComponent,
        JobsManageDeleteDialogComponent,
        JobsManagePopupComponent,
        JobsManageDeletePopupComponent,
    ],
    entryComponents: [
        JobsManageComponent,
        JobsManageDialogComponent,
        JobsManagePopupComponent,
        JobsManageDeleteDialogComponent,
        JobsManageDeletePopupComponent,
    ],
    providers: [
        JobsManageService,
        JobsManagePopupService,
        JobsManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningJobsManageModule {}
