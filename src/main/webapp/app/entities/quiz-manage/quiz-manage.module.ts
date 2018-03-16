import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    QuizManageService,
    QuizManagePopupService,
    QuizManageComponent,
    QuizManageDetailComponent,
    QuizManageDialogComponent,
    QuizManagePopupComponent,
    QuizManageDeletePopupComponent,
    QuizManageDeleteDialogComponent,
    quizRoute,
    quizPopupRoute,
    QuizManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quizRoute,
    ...quizPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuizManageComponent,
        QuizManageDetailComponent,
        QuizManageDialogComponent,
        QuizManageDeleteDialogComponent,
        QuizManagePopupComponent,
        QuizManageDeletePopupComponent,
    ],
    entryComponents: [
        QuizManageComponent,
        QuizManageDialogComponent,
        QuizManagePopupComponent,
        QuizManageDeleteDialogComponent,
        QuizManageDeletePopupComponent,
    ],
    providers: [
        QuizManageService,
        QuizManagePopupService,
        QuizManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningQuizManageModule {}
