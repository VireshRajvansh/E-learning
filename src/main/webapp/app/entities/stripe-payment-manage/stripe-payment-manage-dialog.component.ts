import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StripePaymentManage } from './stripe-payment-manage.model';
import { StripePaymentManagePopupService } from './stripe-payment-manage-popup.service';
import { StripePaymentManageService } from './stripe-payment-manage.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-stripe-payment-manage-dialog',
    templateUrl: './stripe-payment-manage-dialog.component.html'
})
export class StripePaymentManageDialogComponent implements OnInit {

    stripePayment: StripePaymentManage;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stripePaymentService: StripePaymentManageService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stripePayment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stripePaymentService.update(this.stripePayment));
        } else {
            this.subscribeToSaveResponse(
                this.stripePaymentService.create(this.stripePayment));
        }
    }

    private subscribeToSaveResponse(result: Observable<StripePaymentManage>) {
        result.subscribe((res: StripePaymentManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StripePaymentManage) {
        this.eventManager.broadcast({ name: 'stripePaymentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stripe-payment-manage-popup',
    template: ''
})
export class StripePaymentManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripePaymentPopupService: StripePaymentManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stripePaymentPopupService
                    .open(StripePaymentManageDialogComponent as Component, params['id']);
            } else {
                this.stripePaymentPopupService
                    .open(StripePaymentManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
