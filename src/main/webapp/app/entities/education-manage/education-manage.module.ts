import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    EducationManageService,
    EducationManagePopupService,
    EducationManageComponent,
    EducationManageDetailComponent,
    EducationManageDialogComponent,
    EducationManagePopupComponent,
    EducationManageDeletePopupComponent,
    EducationManageDeleteDialogComponent,
    educationRoute,
    educationPopupRoute,
    EducationManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...educationRoute,
    ...educationPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EducationManageComponent,
        EducationManageDetailComponent,
        EducationManageDialogComponent,
        EducationManageDeleteDialogComponent,
        EducationManagePopupComponent,
        EducationManageDeletePopupComponent,
    ],
    entryComponents: [
        EducationManageComponent,
        EducationManageDialogComponent,
        EducationManagePopupComponent,
        EducationManageDeleteDialogComponent,
        EducationManageDeletePopupComponent,
    ],
    providers: [
        EducationManageService,
        EducationManagePopupService,
        EducationManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningEducationManageModule {}
