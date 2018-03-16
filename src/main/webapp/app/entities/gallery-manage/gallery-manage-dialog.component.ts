import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GalleryManage } from './gallery-manage.model';
import { GalleryManagePopupService } from './gallery-manage-popup.service';
import { GalleryManageService } from './gallery-manage.service';
import { GalleryGroupManage, GalleryGroupManageService } from '../gallery-group-manage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-gallery-manage-dialog',
    templateUrl: './gallery-manage-dialog.component.html'
})
export class GalleryManageDialogComponent implements OnInit {

    gallery: GalleryManage;
    isSaving: boolean;

    gallerygroups: GalleryGroupManage[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private galleryService: GalleryManageService,
        private galleryGroupService: GalleryGroupManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.galleryGroupService.query()
            .subscribe((res: ResponseWrapper) => { this.gallerygroups = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gallery.id !== undefined) {
            this.subscribeToSaveResponse(
                this.galleryService.update(this.gallery));
        } else {
            this.subscribeToSaveResponse(
                this.galleryService.create(this.gallery));
        }
    }

    private subscribeToSaveResponse(result: Observable<GalleryManage>) {
        result.subscribe((res: GalleryManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GalleryManage) {
        this.eventManager.broadcast({ name: 'galleryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGalleryGroupById(index: number, item: GalleryGroupManage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-gallery-manage-popup',
    template: ''
})
export class GalleryManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private galleryPopupService: GalleryManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.galleryPopupService
                    .open(GalleryManageDialogComponent as Component, params['id']);
            } else {
                this.galleryPopupService
                    .open(GalleryManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
