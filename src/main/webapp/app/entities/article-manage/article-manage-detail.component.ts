import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ArticleManage } from './article-manage.model';
import { ArticleManageService } from './article-manage.service';

@Component({
    selector: 'jhi-article-manage-detail',
    templateUrl: './article-manage-detail.component.html'
})
export class ArticleManageDetailComponent implements OnInit, OnDestroy {

    article: ArticleManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private articleService: ArticleManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArticles();
    }

    load(id) {
        this.articleService.find(id).subscribe((article) => {
            this.article = article;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArticles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'articleListModification',
            (response) => this.load(this.article.id)
        );
    }
}
