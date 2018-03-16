import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StripeCustomerManage } from './stripe-customer-manage.model';
import { StripeCustomerManagePopupService } from './stripe-customer-manage-popup.service';
import { StripeCustomerManageService } from './stripe-customer-manage.service';

@Component({
    selector: 'jhi-stripe-customer-manage-delete-dialog',
    templateUrl: './stripe-customer-manage-delete-dialog.component.html'
})
export class StripeCustomerManageDeleteDialogComponent {

    stripeCustomer: StripeCustomerManage;

    constructor(
        private stripeCustomerService: StripeCustomerManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stripeCustomerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stripeCustomerListModification',
                content: 'Deleted an stripeCustomer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stripe-customer-manage-delete-popup',
    template: ''
})
export class StripeCustomerManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripeCustomerPopupService: StripeCustomerManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stripeCustomerPopupService
                .open(StripeCustomerManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
