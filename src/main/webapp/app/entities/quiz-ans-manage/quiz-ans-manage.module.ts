import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    QuizAnsManageService,
    QuizAnsManagePopupService,
    QuizAnsManageComponent,
    QuizAnsManageDetailComponent,
    QuizAnsManageDialogComponent,
    QuizAnsManagePopupComponent,
    QuizAnsManageDeletePopupComponent,
    QuizAnsManageDeleteDialogComponent,
    quizAnsRoute,
    quizAnsPopupRoute,
    QuizAnsManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...quizAnsRoute,
    ...quizAnsPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuizAnsManageComponent,
        QuizAnsManageDetailComponent,
        QuizAnsManageDialogComponent,
        QuizAnsManageDeleteDialogComponent,
        QuizAnsManagePopupComponent,
        QuizAnsManageDeletePopupComponent,
    ],
    entryComponents: [
        QuizAnsManageComponent,
        QuizAnsManageDialogComponent,
        QuizAnsManagePopupComponent,
        QuizAnsManageDeleteDialogComponent,
        QuizAnsManageDeletePopupComponent,
    ],
    providers: [
        QuizAnsManageService,
        QuizAnsManagePopupService,
        QuizAnsManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningQuizAnsManageModule {}
