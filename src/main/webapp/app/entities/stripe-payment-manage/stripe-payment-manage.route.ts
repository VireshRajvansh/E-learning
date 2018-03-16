import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StripePaymentManageComponent } from './stripe-payment-manage.component';
import { StripePaymentManageDetailComponent } from './stripe-payment-manage-detail.component';
import { StripePaymentManagePopupComponent } from './stripe-payment-manage-dialog.component';
import { StripePaymentManageDeletePopupComponent } from './stripe-payment-manage-delete-dialog.component';

@Injectable()
export class StripePaymentManageResolvePagingParams implements Resolve<any> {

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

export const stripePaymentRoute: Routes = [
    {
        path: 'stripe-payment-manage',
        component: StripePaymentManageComponent,
        resolve: {
            'pagingParams': StripePaymentManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stripe-payment-manage/:id',
        component: StripePaymentManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripePaymentPopupRoute: Routes = [
    {
        path: 'stripe-payment-manage-new',
        component: StripePaymentManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-payment-manage/:id/edit',
        component: StripePaymentManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-payment-manage/:id/delete',
        component: StripePaymentManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
