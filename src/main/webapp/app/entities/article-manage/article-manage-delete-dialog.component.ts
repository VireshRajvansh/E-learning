import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ArticleManage } from './article-manage.model';
import { ArticleManagePopupService } from './article-manage-popup.service';
import { ArticleManageService } from './article-manage.service';

@Component({
    selector: 'jhi-article-manage-delete-dialog',
    templateUrl: './article-manage-delete-dialog.component.html'
})
export class ArticleManageDeleteDialogComponent {

    article: ArticleManage;

    constructor(
        private articleService: ArticleManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'articleListModification',
                content: 'Deleted an article'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-article-manage-delete-popup',
    template: ''
})
export class ArticleManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private articlePopupService: ArticleManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.articlePopupService
                .open(ArticleManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
