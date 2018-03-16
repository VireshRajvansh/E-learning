import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EducationManageComponent } from './education-manage.component';
import { EducationManageDetailComponent } from './education-manage-detail.component';
import { EducationManagePopupComponent } from './education-manage-dialog.component';
import { EducationManageDeletePopupComponent } from './education-manage-delete-dialog.component';

@Injectable()
export class EducationManageResolvePagingParams implements Resolve<any> {

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

export const educationRoute: Routes = [
    {
        path: 'education-manage',
        component: EducationManageComponent,
        resolve: {
            'pagingParams': EducationManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'education-manage/:id',
        component: EducationManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationPopupRoute: Routes = [
    {
        path: 'education-manage-new',
        component: EducationManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-manage/:id/edit',
        component: EducationManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-manage/:id/delete',
        component: EducationManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
