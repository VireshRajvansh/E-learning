/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageDialogComponent } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage-dialog.component';
import { UserSignUpByReferralCodeManageService } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.service';
import { UserSignUpByReferralCodeManage } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('UserSignUpByReferralCodeManage Management Dialog Component', () => {
        let comp: UserSignUpByReferralCodeManageDialogComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageDialogComponent>;
        let service: UserSignUpByReferralCodeManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageDialogComponent],
                providers: [
                    UserService,
                    UserSignUpByReferralCodeManageService
                ]
            })
            .overrideTemplate(UserSignUpByReferralCodeManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSignUpByReferralCodeManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserSignUpByReferralCodeManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.userSignUpByReferralCode = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userSignUpByReferralCodeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserSignUpByReferralCodeManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.userSignUpByReferralCode = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userSignUpByReferralCodeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
