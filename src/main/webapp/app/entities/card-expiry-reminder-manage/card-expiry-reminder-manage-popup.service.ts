import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardExpiryReminderManage } from './card-expiry-reminder-manage.model';
import { CardExpiryReminderManageService } from './card-expiry-reminder-manage.service';

@Injectable()
export class CardExpiryReminderManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cardExpiryReminderService: CardExpiryReminderManageService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cardExpiryReminderService.find(id).subscribe((cardExpiryReminder) => {
                    if (cardExpiryReminder.sendOnDate) {
                        cardExpiryReminder.sendOnDate = {
                            year: cardExpiryReminder.sendOnDate.getFullYear(),
                            month: cardExpiryReminder.sendOnDate.getMonth() + 1,
                            day: cardExpiryReminder.sendOnDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.cardExpiryReminderModalRef(component, cardExpiryReminder);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cardExpiryReminderModalRef(component, new CardExpiryReminderManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cardExpiryReminderModalRef(component: Component, cardExpiryReminder: CardExpiryReminderManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cardExpiryReminder = cardExpiryReminder;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
