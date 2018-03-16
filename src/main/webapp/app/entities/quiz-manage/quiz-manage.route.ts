import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuizManageComponent } from './quiz-manage.component';
import { QuizManageDetailComponent } from './quiz-manage-detail.component';
import { QuizManagePopupComponent } from './quiz-manage-dialog.component';
import { QuizManageDeletePopupComponent } from './quiz-manage-delete-dialog.component';

@Injectable()
export class QuizManageResolvePagingParams implements Resolve<any> {

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

export const quizRoute: Routes = [
    {
        path: 'quiz-manage',
        component: QuizManageComponent,
        resolve: {
            'pagingParams': QuizManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'quiz-manage/:id',
        component: QuizManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: 'quiz-manage-new',
        component: QuizManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz-manage/:id/edit',
        component: QuizManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'quiz-manage/:id/delete',
        component: QuizManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
