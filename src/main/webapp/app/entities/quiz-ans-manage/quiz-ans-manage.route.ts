import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuizAnsManageComponent } from './quiz-ans-manage.component';
import { QuizAnsManageDetailComponent } from './quiz-ans-manage-detail.component';
import { QuizAnsManagePopupComponent } from './quiz-ans-manage-dialog.component';
import { QuizAnsManageDeletePopupComponent } from './quiz-ans-manage-delete-dialog.component';

@Injectable()
export class QuizAnsManageResolvePagingParams implements Resolve<any> {

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

export const quizAnsRoute: Routes = [
    {
        path: 'quiz-ans-manage',
        component: QuizAnsManageComponent,
        resolve: {
            'pagingParams': QuizAnsManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quiz-ans-manage/:id',
        component: QuizAnsManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizAnsPopupRoute: Routes = [
    {
        path: 'quiz-ans-manage-new',
        component: QuizAnsManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz-ans-manage/:id/edit',
        component: QuizAnsManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz-ans-manage/:id/delete',
        component: QuizAnsManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quizAns.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
