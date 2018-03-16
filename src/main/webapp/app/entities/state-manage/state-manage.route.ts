import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StateManageComponent } from './state-manage.component';
import { StateManageDetailComponent } from './state-manage-detail.component';
import { StateManagePopupComponent } from './state-manage-dialog.component';
import { StateManageDeletePopupComponent } from './state-manage-delete-dialog.component';

@Injectable()
export class StateManageResolvePagingParams implements Resolve<any> {

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

export const stateRoute: Routes = [
    {
        path: 'state-manage',
        component: StateManageComponent,
        resolve: {
            'pagingParams': StateManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'state-manage/:id',
        component: StateManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statePopupRoute: Routes = [
    {
        path: 'state-manage-new',
        component: StateManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-manage/:id/edit',
        component: StateManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-manage/:id/delete',
        component: StateManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
