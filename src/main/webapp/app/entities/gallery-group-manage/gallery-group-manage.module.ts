import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ELearningSharedModule } from '../../shared';
import {
    GalleryGroupManageService,
    GalleryGroupManagePopupService,
    GalleryGroupManageComponent,
    GalleryGroupManageDetailComponent,
    GalleryGroupManageDialogComponent,
    GalleryGroupManagePopupComponent,
    GalleryGroupManageDeletePopupComponent,
    GalleryGroupManageDeleteDialogComponent,
    galleryGroupRoute,
    galleryGroupPopupRoute,
    GalleryGroupManageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...galleryGroupRoute,
    ...galleryGroupPopupRoute,
];

@NgModule({
    imports: [
        ELearningSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GalleryGroupManageComponent,
        GalleryGroupManageDetailComponent,
        GalleryGroupManageDialogComponent,
        GalleryGroupManageDeleteDialogComponent,
        GalleryGroupManagePopupComponent,
        GalleryGroupManageDeletePopupComponent,
    ],
    entryComponents: [
        GalleryGroupManageComponent,
        GalleryGroupManageDialogComponent,
        GalleryGroupManagePopupComponent,
        GalleryGroupManageDeleteDialogComponent,
        GalleryGroupManageDeletePopupComponent,
    ],
    providers: [
        GalleryGroupManageService,
        GalleryGroupManagePopupService,
        GalleryGroupManageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ELearningGalleryGroupManageModule {}
