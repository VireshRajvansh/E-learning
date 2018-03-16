import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardExpiryReminderManage } from './card-expiry-reminder-manage.model';
import { CardExpiryReminderManagePopupService } from './card-expiry-reminder-manage-popup.service';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Component({
    selector: 'jhi-card-expiry-reminder-manage-dialog',
    templateUrl: './card-expiry-reminder-manage-dialog.component.html'
})
export class CardExpiryReminderManageDialogComponent implements OnInit {

    cardExpiryReminder: CardExpiryReminderManage;
    isSaving: boolean;
    sendOnDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private cardExpiryReminderService: CardExpiryReminderManageService,
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
        if (this.cardExpiryReminder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardExpiryReminderService.update(this.cardExpiryReminder));
        } else {
            this.subscribeToSaveResponse(
                this.cardExpiryReminderService.create(this.cardExpiryReminder));
        }
    }

    private subscribeToSaveResponse(result: Observable<CardExpiryReminderManage>) {
        result.subscribe((res: CardExpiryReminderManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CardExpiryReminderManage) {
        this.eventManager.broadcast({ name: 'cardExpiryReminderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-card-expiry-reminder-manage-popup',
    template: ''
})
export class CardExpiryReminderManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardExpiryReminderPopupService: CardExpiryReminderManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardExpiryReminderPopupService
                    .open(CardExpiryReminderManageDialogComponent as Component, params['id']);
            } else {
                this.cardExpiryReminderPopupService
                    .open(CardExpiryReminderManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
