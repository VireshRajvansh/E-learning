import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CardExpiryReminderManageComponent } from './card-expiry-reminder-manage.component';
import { CardExpiryReminderManageDetailComponent } from './card-expiry-reminder-manage-detail.component';
import { CardExpiryReminderManagePopupComponent } from './card-expiry-reminder-manage-dialog.component';
import { CardExpiryReminderManageDeletePopupComponent } from './card-expiry-reminder-manage-delete-dialog.component';

@Injectable()
export class CardExpiryReminderManageResolvePagingParams implements Resolve<any> {

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

export const cardExpiryReminderRoute: Routes = [
    {
        path: 'card-expiry-reminder-manage',
        component: CardExpiryReminderManageComponent,
        resolve: {
            'pagingParams': CardExpiryReminderManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-expiry-reminder-manage/:id',
        component: CardExpiryReminderManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardExpiryReminderPopupRoute: Routes = [
    {
        path: 'card-expiry-reminder-manage-new',
        component: CardExpiryReminderManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-expiry-reminder-manage/:id/edit',
        component: CardExpiryReminderManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-expiry-reminder-manage/:id/delete',
        component: CardExpiryReminderManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.cardExpiryReminder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
