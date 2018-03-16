import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardExpiryReminderManage } from './card-expiry-reminder-manage.model';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-detail',
    templateUrl: './card-expiry-reminder-manage-detail.component.html'
})
export class CardExpiryReminderManageDetailComponent implements OnInit, OnDestroy {

    cardExpiryReminder: CardExpiryReminderManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardExpiryReminderService: CardExpiryReminderManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCardExpiryReminders();
    }

    load(id) {
        this.cardExpiryReminderService.find(id).subscribe((cardExpiryReminder) => {
            this.cardExpiryReminder = cardExpiryReminder;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCardExpiryReminders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardExpiryReminderListModification',
            (response) => this.load(this.cardExpiryReminder.id)
        );
    }
}
