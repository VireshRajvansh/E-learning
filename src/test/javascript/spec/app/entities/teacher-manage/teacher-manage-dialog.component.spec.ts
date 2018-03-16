/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageDialogComponent } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage-dialog.component';
import { TeacherManageService } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.service';
import { TeacherManage } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.model';
import { StripeCustomerManageService } from '../../../../../../main/webapp/app/entities/stripe-customer-manage';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AddressManageService } from '../../../../../../main/webapp/app/entities/address-manage';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage';

describe('Component Tests', () => {

    describe('TeacherManage Management Dialog Component', () => {
        let comp: TeacherManageDialogComponent;
        let fixture: ComponentFixture<TeacherManageDialogComponent>;
        let service: TeacherManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageDialogComponent],
                providers: [
                    StripeCustomerManageService,
                    UserService,
                    AddressManageService,
                    EducationCollegeManageService,
                    TeacherManageService
                ]
            })
            .overrideTemplate(TeacherManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeacherManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.teacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TeacherManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.teacher = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'teacherListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
