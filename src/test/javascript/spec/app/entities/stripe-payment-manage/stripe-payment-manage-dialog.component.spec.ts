/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageDialogComponent } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage-dialog.component';
import { StripePaymentManageService } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.service';
import { StripePaymentManage } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('StripePaymentManage Management Dialog Component', () => {
        let comp: StripePaymentManageDialogComponent;
        let fixture: ComponentFixture<StripePaymentManageDialogComponent>;
        let service: StripePaymentManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageDialogComponent],
                providers: [
                    UserService,
                    StripePaymentManageService
                ]
            })
            .overrideTemplate(StripePaymentManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripePaymentManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripePaymentManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.stripePayment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripePaymentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripePaymentManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.stripePayment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripePaymentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
