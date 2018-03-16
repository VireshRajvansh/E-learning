import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GalleryGroupManageComponent } from './gallery-group-manage.component';
import { GalleryGroupManageDetailComponent } from './gallery-group-manage-detail.component';
import { GalleryGroupManagePopupComponent } from './gallery-group-manage-dialog.component';
import { GalleryGroupManageDeletePopupComponent } from './gallery-group-manage-delete-dialog.component';

@Injectable()
export class GalleryGroupManageResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const galleryGroupRoute: Routes = [
    {
        path: 'gallery-group-manage',
        component: GalleryGroupManageComponent,
        resolve: {
            'pagingParams': GalleryGroupManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gallery-group-manage/:id',
        component: GalleryGroupManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const galleryGroupPopupRoute: Routes = [
    {
        path: 'gallery-group-manage-new',
        component: GalleryGroupManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gallery-group-manage/:id/edit',
        component: GalleryGroupManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gallery-group-manage/:id/delete',
        component: GalleryGroupManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.galleryGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
