import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    ServicesManageService,
    ServicesManagePopupService,
    ServicesManageComponent,
    ServicesManageDetailComponent,
    ServicesManageDialogComponent,
    ServicesManagePopupComponent,
    ServicesManageDeletePopupComponent,
    ServicesManageDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute,
    ServicesManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...servicesRoute,
    ...servicesPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServicesManageComponent,
        ServicesManageDetailComponent,
        ServicesManageDialogComponent,
        ServicesManageDeleteDialogComponent,
        ServicesManagePopupComponent,
        ServicesManageDeletePopupComponent,
    ],
    entryComponents: [
        ServicesManageComponent,
        ServicesManageDialogComponent,
        ServicesManagePopupComponent,
        ServicesManageDeleteDialogComponent,
        ServicesManageDeletePopupComponent,
    ],
    providers: [
        ServicesManageService,
        ServicesManagePopupService,
        ServicesManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningServicesManageModule {}
