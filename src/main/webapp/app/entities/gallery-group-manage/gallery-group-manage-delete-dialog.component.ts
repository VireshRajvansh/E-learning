import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GalleryGroupManage } from './gallery-group-manage.model';
import { GalleryGroupManagePopupService } from './gallery-group-manage-popup.service';
import { GalleryGroupManageService } from './gallery-group-manage.service';

@Component({
    selector: 'jhi-gallery-group-manage-delete-dialog',
    templateUrl: './gallery-group-manage-delete-dialog.component.html'
})
export class GalleryGroupManageDeleteDialogComponent {

    galleryGroup: GalleryGroupManage;

    constructor(
        private galleryGroupService: GalleryGroupManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.galleryGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'galleryGroupListModification',
                content: 'Deleted an galleryGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gallery-group-manage-delete-popup',
    template: ''
})
export class GalleryGroupManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private galleryGroupPopupService: GalleryGroupManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.galleryGroupPopupService
                .open(GalleryGroupManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
