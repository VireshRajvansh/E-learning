import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StripeTransactionManage } from './stripe-transaction-manage.model';
import { StripeTransactionManageService } from './stripe-transaction-manage.service';

@Component({
    selector: 'jhi-stripe-transaction-manage-detail',
    templateUrl: './stripe-transaction-manage-detail.component.html'
})
export class StripeTransactionManageDetailComponent implements OnInit, OnDestroy {

    stripeTransaction: StripeTransactionManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stripeTransactionService: StripeTransactionManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStripeTransactions();
    }

    load(id) {
        this.stripeTransactionService.find(id).subscribe((stripeTransaction) => {
            this.stripeTransaction = stripeTransaction;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStripeTransactions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stripeTransactionListModification',
            (response) => this.load(this.stripeTransaction.id)
        );
    }
}
