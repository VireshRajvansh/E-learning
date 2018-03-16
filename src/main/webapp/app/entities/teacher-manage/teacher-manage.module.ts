import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    TeacherManageService,
    TeacherManagePopupService,
    TeacherManageComponent,
    TeacherManageDetailComponent,
    TeacherManageDialogComponent,
    TeacherManagePopupComponent,
    TeacherManageDeletePopupComponent,
    TeacherManageDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute,
    TeacherManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...teacherRoute,
    ...teacherPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeacherManageComponent,
        TeacherManageDetailComponent,
        TeacherManageDialogComponent,
        TeacherManageDeleteDialogComponent,
        TeacherManagePopupComponent,
        TeacherManageDeletePopupComponent,
    ],
    entryComponents: [
        TeacherManageComponent,
        TeacherManageDialogComponent,
        TeacherManagePopupComponent,
        TeacherManageDeleteDialogComponent,
        TeacherManageDeletePopupComponent,
    ],
    providers: [
        TeacherManageService,
        TeacherManagePopupService,
        TeacherManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningTeacherManageModule {}
