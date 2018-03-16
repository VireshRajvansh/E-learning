import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CourseManageComponent } from './course-manage.component';
import { CourseManageDetailComponent } from './course-manage-detail.component';
import { CourseManagePopupComponent } from './course-manage-dialog.component';
import { CourseManageDeletePopupComponent } from './course-manage-delete-dialog.component';

@Injectable()
export class CourseManageResolvePagingParams implements Resolve<any> {

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

export const courseRoute: Routes = [
    {
        path: 'course-manage',
        component: CourseManageComponent,
        resolve: {
            'pagingParams': CourseManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'course-manage/:id',
        component: CourseManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursePopupRoute: Routes = [
    {
        path: 'course-manage-new',
        component: CourseManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-manage/:id/edit',
        component: CourseManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'course-manage/:id/delete',
        component: CourseManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.course.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
