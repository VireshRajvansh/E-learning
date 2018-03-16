import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EducationCollegeManageComponent } from './education-college-manage.component';
import { EducationCollegeManageDetailComponent } from './education-college-manage-detail.component';
import { EducationCollegeManagePopupComponent } from './education-college-manage-dialog.component';
import { EducationCollegeManageDeletePopupComponent } from './education-college-manage-delete-dialog.component';

@Injectable()
export class EducationCollegeManageResolvePagingParams implements Resolve<any> {

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

export const educationCollegeRoute: Routes = [
    {
        path: 'education-college-manage',
        component: EducationCollegeManageComponent,
        resolve: {
            'pagingParams': EducationCollegeManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'education-college-manage/:id',
        component: EducationCollegeManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationCollegePopupRoute: Routes = [
    {
        path: 'education-college-manage-new',
        component: EducationCollegeManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-college-manage/:id/edit',
        component: EducationCollegeManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-college-manage/:id/delete',
        component: EducationCollegeManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.educationCollege.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
