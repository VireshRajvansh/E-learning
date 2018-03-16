/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { UserSignUpByReferralCodeManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage-delete-dialog.component';
import { UserSignUpByReferralCodeManageService } from '../../../../../../main/webapp/app/entities/user-sign-up-by-referral-code-manage/user-sign-up-by-referral-code-manage.service';

describe('Component Tests', () => {

    describe('UserSignUpByReferralCodeManage Management Delete Component', () => {
        let comp: UserSignUpByReferralCodeManageDeleteDialogComponent;
        let fixture: ComponentFixture<UserSignUpByReferralCodeManageDeleteDialogComponent>;
        let service: UserSignUpByReferralCodeManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [UserSignUpByReferralCodeManageDeleteDialogComponent],
                providers: [
                    UserSignUpByReferralCodeManageService
                ]
            })
            .overrideTemplate(UserSignUpByReferralCodeManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSignUpByReferralCodeManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSignUpByReferralCodeManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
