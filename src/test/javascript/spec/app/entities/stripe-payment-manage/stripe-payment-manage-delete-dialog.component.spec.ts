/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripePaymentManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage-delete-dialog.component';
import { StripePaymentManageService } from '../../../../../../main/webapp/app/entities/stripe-payment-manage/stripe-payment-manage.service';

describe('Component Tests', () => {

    describe('StripePaymentManage Management Delete Component', () => {
        let comp: StripePaymentManageDeleteDialogComponent;
        let fixture: ComponentFixture<StripePaymentManageDeleteDialogComponent>;
        let service: StripePaymentManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripePaymentManageDeleteDialogComponent],
                providers: [
                    StripePaymentManageService
                ]
            })
            .overrideTemplate(StripePaymentManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripePaymentManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripePaymentManageService);
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
