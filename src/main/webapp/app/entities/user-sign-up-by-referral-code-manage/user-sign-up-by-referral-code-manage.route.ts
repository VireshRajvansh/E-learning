import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserSignUpByReferralCodeManageComponent } from './user-sign-up-by-referral-code-manage.component';
import { UserSignUpByReferralCodeManageDetailComponent } from './user-sign-up-by-referral-code-manage-detail.component';
import { UserSignUpByReferralCodeManagePopupComponent } from './user-sign-up-by-referral-code-manage-dialog.component';
import {
    UserSignUpByReferralCodeManageDeletePopupComponent
} from './user-sign-up-by-referral-code-manage-delete-dialog.component';

@Injectable()
export class UserSignUpByReferralCodeManageResolvePagingParams implements Resolve<any> {

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

export const userSignUpByReferralCodeRoute: Routes = [
    {
        path: 'user-sign-up-by-referral-code-manage',
        component: UserSignUpByReferralCodeManageComponent,
        resolve: {
            'pagingParams': UserSignUpByReferralCodeManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-sign-up-by-referral-code-manage/:id',
        component: UserSignUpByReferralCodeManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userSignUpByReferralCodePopupRoute: Routes = [
    {
        path: 'user-sign-up-by-referral-code-manage-new',
        component: UserSignUpByReferralCodeManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-sign-up-by-referral-code-manage/:id/edit',
        component: UserSignUpByReferralCodeManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-sign-up-by-referral-code-manage/:id/delete',
        component: UserSignUpByReferralCodeManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.userSignUpByReferralCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
