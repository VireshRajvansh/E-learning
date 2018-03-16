import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserSignUpByReferralCodeManage } from './user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManagePopupService } from './user-sign-up-by-referral-code-manage-popup.service';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-dialog',
    templateUrl: './user-sign-up-by-referral-code-manage-dialog.component.html'
})
export class UserSignUpByReferralCodeManageDialogComponent implements OnInit {

    userSignUpByReferralCode: UserSignUpByReferralCodeManage;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userSignUpByReferralCode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userSignUpByReferralCodeService.update(this.userSignUpByReferralCode));
        } else {
            this.subscribeToSaveResponse(
                this.userSignUpByReferralCodeService.create(this.userSignUpByReferralCode));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserSignUpByReferralCodeManage>) {
        result.subscribe((res: UserSignUpByReferralCodeManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserSignUpByReferralCodeManage) {
        this.eventManager.broadcast({ name: 'userSignUpByReferralCodeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-popup',
    template: ''
})
export class UserSignUpByReferralCodeManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSignUpByReferralCodePopupService: UserSignUpByReferralCodeManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userSignUpByReferralCodePopupService
                    .open(UserSignUpByReferralCodeManageDialogComponent as Component, params['id']);
            } else {
                this.userSignUpByReferralCodePopupService
                    .open(UserSignUpByReferralCodeManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
