import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StripePaymentManage } from './stripe-payment-manage.model';
import { StripePaymentManagePopupService } from './stripe-payment-manage-popup.service';
import { StripePaymentManageService } from './stripe-payment-manage.service';

@Component({
    selector: 'jhi-stripe-payment-manage-delete-dialog',
    templateUrl: './stripe-payment-manage-delete-dialog.component.html'
})
export class StripePaymentManageDeleteDialogComponent {

    stripePayment: StripePaymentManage;

    constructor(
        private stripePaymentService: StripePaymentManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripePaymentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stripePaymentListModification',
                content: 'Deleted an stripePayment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-payment-manage-delete-popup',
    template: ''
})
export class StripePaymentManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripePaymentPopupService: StripePaymentManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stripePaymentPopupService
                .open(StripePaymentManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
