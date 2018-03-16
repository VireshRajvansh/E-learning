import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferManage } from './offer-manage.model';
import { OfferManagePopupService } from './offer-manage-popup.service';
import { OfferManageService } from './offer-manage.service';

@Component({
    selector: 'jhi-offer-manage-delete-dialog',
    templateUrl: './offer-manage-delete-dialog.component.html'
})
export class OfferManageDeleteDialogComponent {

    offer: OfferManage;

    constructor(
        private offerService: OfferManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'offerListModification',
                content: 'Deleted an offer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-offer-manage-delete-popup',
    template: ''
})
export class OfferManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPopupService: OfferManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.offerPopupService
                .open(OfferManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
