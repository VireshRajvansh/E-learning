import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GalleryManage } from './gallery-manage.model';
import { GalleryManagePopupService } from './gallery-manage-popup.service';
import { GalleryManageService } from './gallery-manage.service';

@Component({
    selector: 'jhi-gallery-manage-delete-dialog',
    templateUrl: './gallery-manage-delete-dialog.component.html'
})
export class GalleryManageDeleteDialogComponent {

    gallery: GalleryManage;

    constructor(
        private galleryService: GalleryManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.galleryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'galleryListModification',
                content: 'Deleted an gallery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gallery-manage-delete-popup',
    template: ''
})
export class GalleryManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private galleryPopupService: GalleryManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.galleryPopupService
                .open(GalleryManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
