import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PlayListManageComponent } from './play-list-manage.component';
import { PlayListManageDetailComponent } from './play-list-manage-detail.component';
import { PlayListManagePopupComponent } from './play-list-manage-dialog.component';
import { PlayListManageDeletePopupComponent } from './play-list-manage-delete-dialog.component';

@Injectable()
export class PlayListManageResolvePagingParams implements Resolve<any> {

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

export const playListRoute: Routes = [
    {
        path: 'play-list-manage',
        component: PlayListManageComponent,
        resolve: {
            'pagingParams': PlayListManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'play-list-manage/:id',
        component: PlayListManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playListPopupRoute: Routes = [
    {
        path: 'play-list-manage-new',
        component: PlayListManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'play-list-manage/:id/edit',
        component: PlayListManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'play-list-manage/:id/delete',
        component: PlayListManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.playList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
