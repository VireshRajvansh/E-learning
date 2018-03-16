import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserSignUpByReferralCodeManage } from './user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManagePopupService } from './user-sign-up-by-referral-code-manage-popup.service';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-delete-dialog',
    templateUrl: './user-sign-up-by-referral-code-manage-delete-dialog.component.html'
})
export class UserSignUpByReferralCodeManageDeleteDialogComponent {

    userSignUpByReferralCode: UserSignUpByReferralCodeManage;

    constructor(
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userSignUpByReferralCodeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userSignUpByReferralCodeListModification',
                content: 'Deleted an userSignUpByReferralCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-delete-popup',
    template: ''
})
export class UserSignUpByReferralCodeManageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSignUpByReferralCodePopupService: UserSignUpByReferralCodeManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userSignUpByReferralCodePopupService
                .open(UserSignUpByReferralCodeManageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
