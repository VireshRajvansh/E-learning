import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StripeTransactionManage } from './stripe-transaction-manage.model';
import { StripeTransactionManagePopupService } from './stripe-transaction-manage-popup.service';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';

@Component({
    selector: 'jhi-stripe-transaction-manage-dialog',
    templateUrl: './stripe-transaction-manage-dialog.component.html'
})
export class StripeTransactionManageDialogComponent implements OnInit {

    stripeTransaction: StripeTransactionManage;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private stripeTransactionService: StripeTransactionManageService,
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
        if (this.stripeTransaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stripeTransactionService.update(this.stripeTransaction));
        } else {
            this.subscribeToSaveResponse(
                this.stripeTransactionService.create(this.stripeTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<StripeTransactionManage>) {
        result.subscribe((res: StripeTransactionManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StripeTransactionManage) {
        this.eventManager.broadcast({ name: 'stripeTransactionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-stripe-transaction-manage-popup',
    template: ''
})
export class StripeTransactionManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripeTransactionPopupService: StripeTransactionManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stripeTransactionPopupService
                    .open(StripeTransactionManageDialogComponent as Component, params['id']);
            } else {
                this.stripeTransactionPopupService
                    .open(StripeTransactionManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
