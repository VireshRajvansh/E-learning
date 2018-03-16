import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CityManageComponent } from './city-manage.component';
import { CityManageDetailComponent } from './city-manage-detail.component';
import { CityManagePopupComponent } from './city-manage-dialog.component';
import { CityManageDeletePopupComponent } from './city-manage-delete-dialog.component';

@Injectable()
export class CityManageResolvePagingParams implements Resolve<any> {

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

export const cityRoute: Routes = [
    {
        path: 'city-manage',
        component: CityManageComponent,
        resolve: {
            'pagingParams': CityManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'city-manage/:id',
        component: CityManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityPopupRoute: Routes = [
    {
        path: 'city-manage-new',
        component: CityManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-manage/:id/edit',
        component: CityManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city-manage/:id/delete',
        component: CityManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
