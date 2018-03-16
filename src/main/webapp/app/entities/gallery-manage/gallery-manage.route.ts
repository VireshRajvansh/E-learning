import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GalleryManageComponent } from './gallery-manage.component';
import { GalleryManageDetailComponent } from './gallery-manage-detail.component';
import { GalleryManagePopupComponent } from './gallery-manage-dialog.component';
import { GalleryManageDeletePopupComponent } from './gallery-manage-delete-dialog.component';

@Injectable()
export class GalleryManageResolvePagingParams implements Resolve<any> {

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

export const galleryRoute: Routes = [
    {
        path: 'gallery-manage',
        component: GalleryManageComponent,
        resolve: {
            'pagingParams': GalleryManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gallery-manage/:id',
        component: GalleryManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const galleryPopupRoute: Routes = [
    {
        path: 'gallery-manage-new',
        component: GalleryManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gallery-manage/:id/edit',
        component: GalleryManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gallery-manage/:id/delete',
        component: GalleryManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.gallery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
