import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TaxRateManageComponent } from './tax-rate-manage.component';
import { TaxRateManageDetailComponent } from './tax-rate-manage-detail.component';
import { TaxRateManagePopupComponent } from './tax-rate-manage-dialog.component';
import { TaxRateManageDeletePopupComponent } from './tax-rate-manage-delete-dialog.component';

@Injectable()
export class TaxRateManageResolvePagingParams implements Resolve<any> {

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

export const taxRateRoute: Routes = [
    {
        path: 'tax-rate-manage',
        component: TaxRateManageComponent,
        resolve: {
            'pagingParams': TaxRateManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tax-rate-manage/:id',
        component: TaxRateManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxRatePopupRoute: Routes = [
    {
        path: 'tax-rate-manage-new',
        component: TaxRateManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-rate-manage/:id/edit',
        component: TaxRateManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-rate-manage/:id/delete',
        component: TaxRateManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.taxRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
