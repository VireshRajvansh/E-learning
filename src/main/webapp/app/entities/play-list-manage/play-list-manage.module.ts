import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    PlayListManageService,
    PlayListManagePopupService,
    PlayListManageComponent,
    PlayListManageDetailComponent,
    PlayListManageDialogComponent,
    PlayListManagePopupComponent,
    PlayListManageDeletePopupComponent,
    PlayListManageDeleteDialogComponent,
    playListRoute,
    playListPopupRoute,
    PlayListManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...playListRoute,
    ...playListPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlayListManageComponent,
        PlayListManageDetailComponent,
        PlayListManageDialogComponent,
        PlayListManageDeleteDialogComponent,
        PlayListManagePopupComponent,
        PlayListManageDeletePopupComponent,
    ],
    entryComponents: [
        PlayListManageComponent,
        PlayListManageDialogComponent,
        PlayListManagePopupComponent,
        PlayListManageDeleteDialogComponent,
        PlayListManageDeletePopupComponent,
    ],
    providers: [
        PlayListManageService,
        PlayListManagePopupService,
        PlayListManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningPlayListManageModule {}
