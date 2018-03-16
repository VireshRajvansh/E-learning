import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GalleryGroupManage } from './gallery-group-manage.model';
import { GalleryGroupManagePopupService } from './gallery-group-manage-popup.service';
import { GalleryGroupManageService } from './gallery-group-manage.service';

@Component({
    selector: 'jhi-gallery-group-manage-dialog',
    templateUrl: './gallery-group-manage-dialog.component.html'
})
export class GalleryGroupManageDialogComponent implements OnInit {

    galleryGroup: GalleryGroupManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private galleryGroupService: GalleryGroupManageService,
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
        if (this.galleryGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.galleryGroupService.update(this.galleryGroup));
        } else {
            this.subscribeToSaveResponse(
                this.galleryGroupService.create(this.galleryGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<GalleryGroupManage>) {
        result.subscribe((res: GalleryGroupManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GalleryGroupManage) {
        this.eventManager.broadcast({ name: 'galleryGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gallery-group-manage-popup',
    template: ''
})
export class GalleryGroupManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private galleryGroupPopupService: GalleryGroupManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.galleryGroupPopupService
                    .open(GalleryGroupManageDialogComponent as Component, params['id']);
            } else {
                this.galleryGroupPopupService
                    .open(GalleryGroupManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
