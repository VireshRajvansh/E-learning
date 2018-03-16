import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeacherManage } from './teacher-manage.model';
import { TeacherManagePopupService } from './teacher-manage-popup.service';
import { TeacherManageService } from './teacher-manage.service';
import { StripeCustomerManage, StripeCustomerManageService } from '../stripe-customer-manage';
import { User, UserService } from '../../shared';
import { AddressManage, AddressManageService } from '../address-manage';
import { EducationCollegeManage, EducationCollegeManageService } from '../education-college-manage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-teacher-manage-dialog',
    templateUrl: './teacher-manage-dialog.component.html'
})
export class TeacherManageDialogComponent implements OnInit {

    teacher: TeacherManage;
    isSaving: boolean;

    stripecustomers: StripeCustomerManage[];

    users: User[];

    addresses: AddressManage[];

    educationcolleges: EducationCollegeManage[];
    dobDp: any;
    premiumTillDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherManageService,
        private stripeCustomerService: StripeCustomerManageService,
        private userService: UserService,
        private addressService: AddressManageService,
        private educationCollegeService: EducationCollegeManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stripeCustomerService
            .query({filter: 'teacher-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.teacher.stripeCustomerId) {
                    this.stripecustomers = res.json;
                } else {
                    this.stripeCustomerService
                        .find(this.teacher.stripeCustomerId)
                        .subscribe((subRes: StripeCustomerManage) => {
                            this.stripecustomers = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.addressService.query()
            .subscribe((res: ResponseWrapper) => { this.addresses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.educationCollegeService.query()
            .subscribe((res: ResponseWrapper) => { this.educationcolleges = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(
                this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<TeacherManage>) {
        result.subscribe((res: TeacherManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TeacherManage) {
        this.eventManager.broadcast({ name: 'teacherListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStripeCustomerById(index: number, item: StripeCustomerManage) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackAddressById(index: number, item: AddressManage) {
        return item.id;
    }

    trackEducationCollegeById(index: number, item: EducationCollegeManage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-teacher-manage-popup',
    template: ''
})
export class TeacherManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teacherPopupService
                    .open(TeacherManageDialogComponent as Component, params['id']);
            } else {
                this.teacherPopupService
                    .open(TeacherManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
