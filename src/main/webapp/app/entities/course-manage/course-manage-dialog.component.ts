import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CourseManage } from './course-manage.model';
import { CourseManagePopupService } from './course-manage-popup.service';
import { CourseManageService } from './course-manage.service';
import { PlayListManage, PlayListManageService } from '../play-list-manage';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-course-manage-dialog',
    templateUrl: './course-manage-dialog.component.html'
})
export class CourseManageDialogComponent implements OnInit {

    course: CourseManage;
    isSaving: boolean;

    playlists: PlayListManage[];

    users: User[];
    premiumTillDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private courseService: CourseManageService,
        private playListService: PlayListManageService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.playListService.query()
            .subscribe((res: ResponseWrapper) => { this.playlists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.subscribeToSaveResponse(
                this.courseService.update(this.course));
        } else {
            this.subscribeToSaveResponse(
                this.courseService.create(this.course));
        }
    }

    private subscribeToSaveResponse(result: Observable<CourseManage>) {
        result.subscribe((res: CourseManage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CourseManage) {
        this.eventManager.broadcast({ name: 'courseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPlayListById(index: number, item: PlayListManage) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-course-manage-popup',
    template: ''
})
export class CourseManagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coursePopupService: CourseManagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coursePopupService
                    .open(CourseManageDialogComponent as Component, params['id']);
            } else {
                this.coursePopupService
                    .open(CourseManageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
