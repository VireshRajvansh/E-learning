import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import { ELearningAdminModule } from '../../admin/admin.module';
import {
    ArticleManageService,
    ArticleManagePopupService,
    ArticleManageComponent,
    ArticleManageDetailComponent,
    ArticleManageDialogComponent,
    ArticleManagePopupComponent,
    ArticleManageDeletePopupComponent,
    ArticleManageDeleteDialogComponent,
    articleRoute,
    articlePopupRoute,
    ArticleManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...articleRoute,
    ...articlePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        ELearningAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ArticleManageComponent,
        ArticleManageDetailComponent,
        ArticleManageDialogComponent,
        ArticleManageDeleteDialogComponent,
        ArticleManagePopupComponent,
        ArticleManageDeletePopupComponent,
    ],
    entryComponents: [
        ArticleManageComponent,
        ArticleManageDialogComponent,
        ArticleManagePopupComponent,
        ArticleManageDeleteDialogComponent,
        ArticleManageDeletePopupComponent,
    ],
    providers: [
        ArticleManageService,
        ArticleManagePopupService,
        ArticleManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningArticleManageModule {}
