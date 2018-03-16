import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JobsManageComponent } from './jobs-manage.component';
import { JobsManageDetailComponent } from './jobs-manage-detail.component';
import { JobsManagePopupComponent } from './jobs-manage-dialog.component';
import { JobsManageDeletePopupComponent } from './jobs-manage-delete-dialog.component';

@Injectable()
export class JobsManageResolvePagingParams implements Resolve<any> {

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

export const jobsRoute: Routes = [
    {
        path: 'jobs-manage',
        component: JobsManageComponent,
        resolve: {
            'pagingParams': JobsManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'jobs-manage/:id',
        component: JobsManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobsPopupRoute: Routes = [
    {
        path: 'jobs-manage-new',
        component: JobsManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobs-manage/:id/edit',
        component: JobsManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'jobs-manage/:id/delete',
        component: JobsManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.jobs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
