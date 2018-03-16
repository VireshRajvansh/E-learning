import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StripePaymentManage } from './stripe-payment-manage.model';
import { StripePaymentManageService } from './stripe-payment-manage.service';

@Component({
    selector: 'jhi-stripe-payment-manage-detail',
    templateUrl: './stripe-payment-manage-detail.component.html'
})
export class StripePaymentManageDetailComponent implements OnInit, OnDestroy {

    stripePayment: StripePaymentManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stripePaymentService: StripePaymentManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStripePayments();
    }

    load(id) {
        this.stripePaymentService.find(id).subscribe((stripePayment) => {
            this.stripePayment = stripePayment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStripePayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stripePaymentListModification',
            (response) => this.load(this.stripePayment.id)
        );
    }
}
