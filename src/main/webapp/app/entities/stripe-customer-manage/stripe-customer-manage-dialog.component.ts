import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StripeCustomerManage } from './stripe-customer-manage.model';
import { StripeCustomerManagePopupService } from './stripe-customer-manage-popup.service';
import { StripeCustomerManageService } from './stripe-customer-manage.service';
import { User, UserService } from '../../shared';
import { StudentManage, StudentManageService } from '../student-manage';
import { TeacherManage, TeacherManageService } from '../teacher-manage';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-stripe-customer-manage-dialog',
    templateUrl: './stripe-customer-manage-dialog.component.html'
})
export class StripeCustomerManageDialogComponent implements OnInit {

    stripeCustomer: StripeCustomerManage;
    isSaving: boolean;

    users: User[];

    students: StudentManage[];

    teachers: TeacherManage[];
    expectedExpiryDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stripeCustomerService: StripeCustomerManageService,
        private userService: UserService,
        private studentService: StudentManageService,
        private teacherService: TeacherManageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.studentService.query()
            .subscribe((res: ResponseWrapper) => { this.students = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.teacherService.query()
            .subscribe((res: ResponseWrapper) => { this.teachers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stripeCustomer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stripeCustomerService.update(this.stripeCustomer));
        } else {
            this.subscribeToSaveResponse(
                this.stripeCustomerService.create(this.stripeCustomer));
        }
    }

    private subscribeToSaveResponse(result: Observable<StripeCustomerManage>) {
        result.subscribe((res: StripeCustomerManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StripeCustomerManage) {
        this.eventManager.broadcast({ name: 'stripeCustomerListModification', content: 'OK'});
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

    trackStudentById(index: number, item: StudentManage) {
        return item.id;
    }

    trackTeacherById(index: number, item: TeacherManage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stripe-customer-manage-popup',
    template: ''
})
export class StripeCustomerManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stripeCustomerPopupService: StripeCustomerManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stripeCustomerPopupService
                    .open(StripeCustomerManageDialogComponent as Component, params['id']);
            } else {
                this.stripeCustomerPopupService
                    .open(StripeCustomerManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
