import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    GalleryManageService,
    GalleryManagePopupService,
    GalleryManageComponent,
    GalleryManageDetailComponent,
    GalleryManageDialogComponent,
    GalleryManagePopupComponent,
    GalleryManageDeletePopupComponent,
    GalleryManageDeleteDialogComponent,
    galleryRoute,
    galleryPopupRoute,
    GalleryManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...galleryRoute,
    ...galleryPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GalleryManageComponent,
        GalleryManageDetailComponent,
        GalleryManageDialogComponent,
        GalleryManageDeleteDialogComponent,
        GalleryManagePopupComponent,
        GalleryManageDeletePopupComponent,
    ],
    entryComponents: [
        GalleryManageComponent,
        GalleryManageDialogComponent,
        GalleryManagePopupComponent,
        GalleryManageDeleteDialogComponent,
        GalleryManageDeletePopupComponent,
    ],
    providers: [
        GalleryManageService,
        GalleryManagePopupService,
        GalleryManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningGalleryManageModule {}
