/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StudentManageDialogComponent } from '../../../../../../main/webapp/app/entities/student-manage/student-manage-dialog.component';
import { StudentManageService } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.service';
import { StudentManage } from '../../../../../../main/webapp/app/entities/student-manage/student-manage.model';
import { StripeCustomerManageService } from '../../../../../../main/webapp/app/entities/stripe-customer-manage';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AddressManageService } from '../../../../../../main/webapp/app/entities/address-manage';
import { EducationCollegeManageService } from '../../../../../../main/webapp/app/entities/education-college-manage';

describe('Component Tests', () => {

    describe('StudentManage Management Dialog Component', () => {
        let comp: StudentManageDialogComponent;
        let fixture: ComponentFixture<StudentManageDialogComponent>;
        let service: StudentManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StudentManageDialogComponent],
                providers: [
                    StripeCustomerManageService,
                    UserService,
                    AddressManageService,
                    EducationCollegeManageService,
                    StudentManageService
                ]
            })
            .overrideTemplate(StudentManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
