import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayListManage } from './play-list-manage.model';
import { PlayListManagePopupService } from './play-list-manage-popup.service';
import { PlayListManageService } from './play-list-manage.service';

@Component({
    selector: 'jhi-play-list-manage-dialog',
    templateUrl: './play-list-manage-dialog.component.html'
})
export class PlayListManageDialogComponent implements OnInit {

    playList: PlayListManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private playListService: PlayListManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.playList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playListService.update(this.playList));
        } else {
            this.subscribeToSaveResponse(
                this.playListService.create(this.playList));
        }
    }

    private subscribeToSaveResponse(result: Observable<PlayListManage>) {
        result.subscribe((res: PlayListManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PlayListManage) {
        this.eventManager.broadcast({ name: 'playListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-play-list-manage-popup',
    template: ''
})
export class PlayListManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playListPopupService: PlayListManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playListPopupService
                    .open(PlayListManageDialogComponent as Component, params['id']);
            } else {
                this.playListPopupService
                    .open(PlayListManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
