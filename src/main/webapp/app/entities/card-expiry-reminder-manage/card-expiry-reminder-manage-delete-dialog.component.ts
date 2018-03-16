import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardExpiryReminderManage } from './card-expiry-reminder-manage.model';
import { CardExpiryReminderManagePopupService } from './card-expiry-reminder-manage-popup.service';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-delete-dialog',
    templateUrl: './card-expiry-reminder-manage-delete-dialog.component.html'
})
export class CardExpiryReminderManageDeleteDialogComponent {

    cardExpiryReminder: CardExpiryReminderManage;

    constructor(
        private cardExpiryReminderService: CardExpiryReminderManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardExpiryReminderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardExpiryReminderListModification',
                content: 'Deleted an cardExpiryReminder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-expiry-reminder-manage-delete-popup',
    template: ''
})
export class CardExpiryReminderManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardExpiryReminderPopupService: CardExpiryReminderManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardExpiryReminderPopupService
                .open(CardExpiryReminderManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
