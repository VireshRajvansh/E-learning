import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayListManage } from './play-list-manage.model';
import { PlayListManagePopupService } from './play-list-manage-popup.service';
import { PlayListManageService } from './play-list-manage.service';

@Component({
    selector: 'jhi-play-list-manage-delete-dialog',
    templateUrl: './play-list-manage-delete-dialog.component.html'
})
export class PlayListManageDeleteDialogComponent {

    playList: PlayListManage;

    constructor(
        private playListService: PlayListManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playListListModification',
                content: 'Deleted an playList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-play-list-manage-delete-popup',
    template: ''
})
export class PlayListManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playListPopupService: PlayListManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.playListPopupService
                .open(PlayListManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
