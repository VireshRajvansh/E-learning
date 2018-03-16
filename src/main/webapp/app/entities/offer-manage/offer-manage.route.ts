import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OfferManageComponent } from './offer-manage.component';
import { OfferManageDetailComponent } from './offer-manage-detail.component';
import { OfferManagePopupComponent } from './offer-manage-dialog.component';
import { OfferManageDeletePopupComponent } from './offer-manage-delete-dialog.component';

@Injectable()
export class OfferManageResolvePagingParams implements Resolve<any> {

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

export const offerRoute: Routes = [
    {
        path: 'offer-manage',
        component: OfferManageComponent,
        resolve: {
            'pagingParams': OfferManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer-manage/:id',
        component: OfferManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPopupRoute: Routes = [
    {
        path: 'offer-manage-new',
        component: OfferManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-manage/:id/edit',
        component: OfferManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-manage/:id/delete',
        component: OfferManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.offer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
