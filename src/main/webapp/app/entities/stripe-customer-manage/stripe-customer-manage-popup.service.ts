import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { StripeCustomerManage } from './stripe-customer-manage.model';
import { StripeCustomerManageService } from './stripe-customer-manage.service';

@Injectable()
export class StripeCustomerManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stripeCustomerService: StripeCustomerManageService

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
                this.stripeCustomerService.find(id).subscribe((stripeCustomer) => {
                    stripeCustomer.created = this.datePipe
                        .transform(stripeCustomer.created, 'yyyy-MM-ddTHH:mm:ss');
                    if (stripeCustomer.expectedExpiryDate) {
                        stripeCustomer.expectedExpiryDate = {
                            year: stripeCustomer.expectedExpiryDate.getFullYear(),
                            month: stripeCustomer.expectedExpiryDate.getMonth() + 1,
                            day: stripeCustomer.expectedExpiryDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.stripeCustomerModalRef(component, stripeCustomer);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stripeCustomerModalRef(component, new StripeCustomerManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stripeCustomerModalRef(component: Component, stripeCustomer: StripeCustomerManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stripeCustomer = stripeCustomer;
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
