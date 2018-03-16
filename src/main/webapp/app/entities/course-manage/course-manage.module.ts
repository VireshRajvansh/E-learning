import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    CourseManageService,
    CourseManagePopupService,
    CourseManageComponent,
    CourseManageDetailComponent,
    CourseManageDialogComponent,
    CourseManagePopupComponent,
    CourseManageDeletePopupComponent,
    CourseManageDeleteDialogComponent,
    courseRoute,
    coursePopupRoute,
    CourseManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...courseRoute,
    ...coursePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CourseManageComponent,
        CourseManageDetailComponent,
        CourseManageDialogComponent,
        CourseManageDeleteDialogComponent,
        CourseManagePopupComponent,
        CourseManageDeletePopupComponent,
    ],
    entryComponents: [
        CourseManageComponent,
        CourseManageDialogComponent,
        CourseManagePopupComponent,
        CourseManageDeleteDialogComponent,
        CourseManageDeletePopupComponent,
    ],
    providers: [
        CourseManageService,
        CourseManagePopupService,
        CourseManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCourseManageModule {}
