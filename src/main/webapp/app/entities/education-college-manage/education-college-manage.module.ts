import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    EducationCollegeManageService,
    EducationCollegeManagePopupService,
    EducationCollegeManageComponent,
    EducationCollegeManageDetailComponent,
    EducationCollegeManageDialogComponent,
    EducationCollegeManagePopupComponent,
    EducationCollegeManageDeletePopupComponent,
    EducationCollegeManageDeleteDialogComponent,
    educationCollegeRoute,
    educationCollegePopupRoute,
    EducationCollegeManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...educationCollegeRoute,
    ...educationCollegePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EducationCollegeManageComponent,
        EducationCollegeManageDetailComponent,
        EducationCollegeManageDialogComponent,
        EducationCollegeManageDeleteDialogComponent,
        EducationCollegeManagePopupComponent,
        EducationCollegeManageDeletePopupComponent,
    ],
    entryComponents: [
        EducationCollegeManageComponent,
        EducationCollegeManageDialogComponent,
        EducationCollegeManagePopupComponent,
        EducationCollegeManageDeleteDialogComponent,
        EducationCollegeManageDeletePopupComponent,
    ],
    providers: [
        EducationCollegeManageService,
        EducationCollegeManagePopupService,
        EducationCollegeManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningEducationCollegeManageModule {}
