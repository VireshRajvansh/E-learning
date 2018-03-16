import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ServicesManageComponent } from './services-manage.component';
import { ServicesManageDetailComponent } from './services-manage-detail.component';
import { ServicesManagePopupComponent } from './services-manage-dialog.component';
import { ServicesManageDeletePopupComponent } from './services-manage-delete-dialog.component';

@Injectable()
export class ServicesManageResolvePagingParams implements Resolve<any> {

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

export const servicesRoute: Routes = [
    {
        path: 'services-manage',
        component: ServicesManageComponent,
        resolve: {
            'pagingParams': ServicesManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'services-manage/:id',
        component: ServicesManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicesPopupRoute: Routes = [
    {
        path: 'services-manage-new',
        component: ServicesManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'services-manage/:id/edit',
        component: ServicesManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'services-manage/:id/delete',
        component: ServicesManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
