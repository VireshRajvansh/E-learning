/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageDialogComponent } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage-dialog.component';
import { StripeCustomerManageService } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.service';
import { StripeCustomerManage } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { StudentManageService } from '../../../../../../main/webapp/app/entities/student-manage';
import { TeacherManageService } from '../../../../../../main/webapp/app/entities/teacher-manage';

describe('Component Tests', () => {

    describe('StripeCustomerManage Management Dialog Component', () => {
        let comp: StripeCustomerManageDialogComponent;
        let fixture: ComponentFixture<StripeCustomerManageDialogComponent>;
        let service: StripeCustomerManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageDialogComponent],
                providers: [
                    UserService,
                    StudentManageService,
                    TeacherManageService,
                    StripeCustomerManageService
                ]
            })
            .overrideTemplate(StripeCustomerManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeCustomerManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeCustomerManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripeCustomerManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.stripeCustomer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripeCustomerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripeCustomerManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.stripeCustomer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripeCustomerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
