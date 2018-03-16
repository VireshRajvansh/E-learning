import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    StudentManageService,
    StudentManagePopupService,
    StudentManageComponent,
    StudentManageDetailComponent,
    StudentManageDialogComponent,
    StudentManagePopupComponent,
    StudentManageDeletePopupComponent,
    StudentManageDeleteDialogComponent,
    studentRoute,
    studentPopupRoute,
    StudentManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudentManageComponent,
        StudentManageDetailComponent,
        StudentManageDialogComponent,
        StudentManageDeleteDialogComponent,
        StudentManagePopupComponent,
        StudentManageDeletePopupComponent,
    ],
    entryComponents: [
        StudentManageComponent,
        StudentManageDialogComponent,
        StudentManagePopupComponent,
        StudentManageDeleteDialogComponent,
        StudentManageDeletePopupComponent,
    ],
    providers: [
        StudentManageService,
        StudentManagePopupService,
        StudentManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStudentManageModule {}
