import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StripeTransactionManageComponent } from './stripe-transaction-manage.component';
import { StripeTransactionManageDetailComponent } from './stripe-transaction-manage-detail.component';
import { StripeTransactionManagePopupComponent } from './stripe-transaction-manage-dialog.component';
import { StripeTransactionManageDeletePopupComponent } from './stripe-transaction-manage-delete-dialog.component';

@Injectable()
export class StripeTransactionManageResolvePagingParams implements Resolve<any> {

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

export const stripeTransactionRoute: Routes = [
    {
        path: 'stripe-transaction-manage',
        component: StripeTransactionManageComponent,
        resolve: {
            'pagingParams': StripeTransactionManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stripe-transaction-manage/:id',
        component: StripeTransactionManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripeTransactionPopupRoute: Routes = [
    {
        path: 'stripe-transaction-manage-new',
        component: StripeTransactionManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-transaction-manage/:id/edit',
        component: StripeTransactionManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-transaction-manage/:id/delete',
        component: StripeTransactionManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
