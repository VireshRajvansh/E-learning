import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    StateManageService,
    StateManagePopupService,
    StateManageComponent,
    StateManageDetailComponent,
    StateManageDialogComponent,
    StateManagePopupComponent,
    StateManageDeletePopupComponent,
    StateManageDeleteDialogComponent,
    stateRoute,
    statePopupRoute,
    StateManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stateRoute,
    ...statePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StateManageComponent,
        StateManageDetailComponent,
        StateManageDialogComponent,
        StateManageDeleteDialogComponent,
        StateManagePopupComponent,
        StateManageDeletePopupComponent,
    ],
    entryComponents: [
        StateManageComponent,
        StateManageDialogComponent,
        StateManagePopupComponent,
        StateManageDeleteDialogComponent,
        StateManageDeletePopupComponent,
    ],
    providers: [
        StateManageService,
        StateManagePopupService,
        StateManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningStateManageModule {}
