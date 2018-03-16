import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StudentManageComponent } from './student-manage.component';
import { StudentManageDetailComponent } from './student-manage-detail.component';
import { StudentManagePopupComponent } from './student-manage-dialog.component';
import { StudentManageDeletePopupComponent } from './student-manage-delete-dialog.component';

@Injectable()
export class StudentManageResolvePagingParams implements Resolve<any> {

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

export const studentRoute: Routes = [
    {
        path: 'student-manage',
        component: StudentManageComponent,
        resolve: {
            'pagingParams': StudentManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'student-manage/:id',
        component: StudentManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-manage-new',
        component: StudentManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-manage/:id/edit',
        component: StudentManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-manage/:id/delete',
        component: StudentManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
