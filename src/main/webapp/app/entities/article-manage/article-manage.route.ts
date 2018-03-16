import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ArticleManageComponent } from './article-manage.component';
import { ArticleManageDetailComponent } from './article-manage-detail.component';
import { ArticleManagePopupComponent } from './article-manage-dialog.component';
import { ArticleManageDeletePopupComponent } from './article-manage-delete-dialog.component';

@Injectable()
export class ArticleManageResolvePagingParams implements Resolve<any> {

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

export const articleRoute: Routes = [
    {
        path: 'article-manage',
        component: ArticleManageComponent,
        resolve: {
            'pagingParams': ArticleManageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'article-manage/:id',
        component: ArticleManageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlePopupRoute: Routes = [
    {
        path: 'article-manage-new',
        component: ArticleManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article-manage/:id/edit',
        component: ArticleManagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article-manage/:id/delete',
        component: ArticleManageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eLearningApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
