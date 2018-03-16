import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    CityManageService,
    CityManagePopupService,
    CityManageComponent,
    CityManageDetailComponent,
    CityManageDialogComponent,
    CityManagePopupComponent,
    CityManageDeletePopupComponent,
    CityManageDeleteDialogComponent,
    cityRoute,
    cityPopupRoute,
    CityManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cityRoute,
    ...cityPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CityManageComponent,
        CityManageDetailComponent,
        CityManageDialogComponent,
        CityManageDeleteDialogComponent,
        CityManagePopupComponent,
        CityManageDeletePopupComponent,
    ],
    entryComponents: [
        CityManageComponent,
        CityManageDialogComponent,
        CityManagePopupComponent,
        CityManageDeleteDialogComponent,
        CityManageDeletePopupComponent,
    ],
    providers: [
        CityManageService,
        CityManagePopupService,
        CityManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningCityManageModule {}
