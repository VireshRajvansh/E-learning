import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserSignUpByReferralCodeManage } from './user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';

@Injectable()
export class UserSignUpByReferralCodeManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService

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
                this.userSignUpByReferralCodeService.find(id).subscribe((userSignUpByReferralCode) => {
                    this.ngbModalRef = this.userSignUpByReferralCodeModalRef(component, userSignUpByReferralCode);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userSignUpByReferralCodeModalRef(component, new UserSignUpByReferralCodeManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userSignUpByReferralCodeModalRef(component: Component, userSignUpByReferralCode: UserSignUpByReferralCodeManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userSignUpByReferralCode = userSignUpByReferralCode;
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
