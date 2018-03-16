import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserSignUpByReferralCodeManage } from './user-sign-up-by-referral-code-manage.model';
import { UserSignUpByReferralCodeManageService } from './user-sign-up-by-referral-code-manage.service';

@Component({
    selector: 'jhi-user-sign-up-by-referral-code-manage-detail',
    templateUrl: './user-sign-up-by-referral-code-manage-detail.component.html'
})
export class UserSignUpByReferralCodeManageDetailComponent implements OnInit, OnDestroy {

    userSignUpByReferralCode: UserSignUpByReferralCodeManage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userSignUpByReferralCodeService: UserSignUpByReferralCodeManageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserSignUpByReferralCodes();
    }

    load(id) {
        this.userSignUpByReferralCodeService.find(id).subscribe((userSignUpByReferralCode) => {
            this.userSignUpByReferralCode = userSignUpByReferralCode;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserSignUpByReferralCodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userSignUpByReferralCodeListModification',
            (response) => this.load(this.userSignUpByReferralCode.id)
        );
    }
}
