import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OfferManage } from './offer-manage.model';
import { OfferManagePopupService } from './offer-manage-popup.service';
import { OfferManageService } from './offer-manage.service';

@Component({
    selector: 'jhi-offer-manage-dialog',
    templateUrl: './offer-manage-dialog.component.html'
})
export class OfferManageDialogComponent implements OnInit {

    offer: OfferManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private offerService: OfferManageService,
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
        if (this.offer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerService.update(this.offer));
        } else {
            this.subscribeToSaveResponse(
                this.offerService.create(this.offer));
        }
    }

    private subscribeToSaveResponse(result: Observable<OfferManage>) {
        result.subscribe((res: OfferManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferManage) {
        this.eventManager.broadcast({ name: 'offerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-offer-manage-popup',
    template: ''
})
export class OfferManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPopupService: OfferManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPopupService
                    .open(OfferManageDialogComponent as Component, params['id']);
            } else {
                this.offerPopupService
                    .open(OfferManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
