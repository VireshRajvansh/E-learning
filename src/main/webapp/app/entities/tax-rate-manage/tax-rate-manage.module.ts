import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    TaxRateManageService,
    TaxRateManagePopupService,
    TaxRateManageComponent,
    TaxRateManageDetailComponent,
    TaxRateManageDialogComponent,
    TaxRateManagePopupComponent,
    TaxRateManageDeletePopupComponent,
    TaxRateManageDeleteDialogComponent,
    taxRateRoute,
    taxRatePopupRoute,
    TaxRateManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...taxRateRoute,
    ...taxRatePopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaxRateManageComponent,
        TaxRateManageDetailComponent,
        TaxRateManageDialogComponent,
        TaxRateManageDeleteDialogComponent,
        TaxRateManagePopupComponent,
        TaxRateManageDeletePopupComponent,
    ],
    entryComponents: [
        TaxRateManageComponent,
        TaxRateManageDialogComponent,
        TaxRateManagePopupComponent,
        TaxRateManageDeleteDialogComponent,
        TaxRateManageDeletePopupComponent,
    ],
    providers: [
        TaxRateManageService,
        TaxRateManagePopupService,
        TaxRateManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningTaxRateManageModule {}
