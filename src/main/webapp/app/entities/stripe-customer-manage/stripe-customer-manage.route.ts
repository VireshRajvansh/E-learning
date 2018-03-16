import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StripeCustomerManageComponent } from './stripe-customer-manage.component';
import { StripeCustomerManageDetailComponent } from './stripe-customer-manage-detail.component';
import { StripeCustomerManagePopupComponent } from './stripe-customer-manage-dialog.component';
import { StripeCustomerManageDeletePopupComponent } from './stripe-customer-manage-delete-dialog.component';

@Injectable()
export class StripeCustomerManageResolvePagingParams implements Resolve<any> {

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

export const stripeCustomerRoute: Routes = [
    {
        path: 'stripe-customer-manage',
        component: StripeCustomerManageComponent,
        resolve: {
            'pagingParams': StripeCustomerManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stripe-customer-manage/:id',
        component: StripeCustomerManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stripeCustomerPopupRoute: Routes = [
    {
        path: 'stripe-customer-manage-new',
        component: StripeCustomerManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-customer-manage/:id/edit',
        component: StripeCustomerManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stripe-customer-manage/:id/delete',
        component: StripeCustomerManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.stripeCustomer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
