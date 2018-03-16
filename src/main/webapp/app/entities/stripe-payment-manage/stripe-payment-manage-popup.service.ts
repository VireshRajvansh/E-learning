import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { StripePaymentManage } from './stripe-payment-manage.model';
import { StripePaymentManageService } from './stripe-payment-manage.service';

@Injectable()
export class StripePaymentManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stripePaymentService: StripePaymentManageService

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
                this.stripePaymentService.find(id).subscribe((stripePayment) => {
                    stripePayment.created = this.datePipe
                        .transform(stripePayment.created, 'yyyy-MM-ddTHH:mm:ss');
                    stripePayment.planCreated = this.datePipe
                        .transform(stripePayment.planCreated, 'yyyy-MM-ddTHH:mm:ss');
                    stripePayment.periodEnd = this.datePipe
                        .transform(stripePayment.periodEnd, 'yyyy-MM-ddTHH:mm:ss');
                    stripePayment.periodStart = this.datePipe
                        .transform(stripePayment.periodStart, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.stripePaymentModalRef(component, stripePayment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stripePaymentModalRef(component, new StripePaymentManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stripePaymentModalRef(component: Component, stripePayment: StripePaymentManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stripePayment = stripePayment;
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
