import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StripeTransactionManage } from './stripe-transaction-manage.model';
import { StripeTransactionManagePopupService } from './stripe-transaction-manage-popup.service';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';

@Component({
    selector: 'jhi-stripe-transaction-manage-delete-dialog',
    templateUrl: './stripe-transaction-manage-delete-dialog.component.html'
})
export class StripeTransactionManageDeleteDialogComponent {

    stripeTransaction: StripeTransactionManage;

    constructor(
        private stripeTransactionService: StripeTransactionManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripeTransactionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stripeTransactionListModification',
                content: 'Deleted an stripeTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-transaction-manage-delete-popup',
    template: ''
})
export class StripeTransactionManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripeTransactionPopupService: StripeTransactionManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stripeTransactionPopupService
                .open(StripeTransactionManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
