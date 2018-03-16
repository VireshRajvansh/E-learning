/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage-delete-dialog.component';
import { StripeTransactionManageService } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.service';

describe('Component Tests', () => {

    describe('StripeTransactionManage Management Delete Component', () => {
        let comp: StripeTransactionManageDeleteDialogComponent;
        let fixture: ComponentFixture<StripeTransactionManageDeleteDialogComponent>;
        let service: StripeTransactionManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageDeleteDialogComponent],
                providers: [
                    StripeTransactionManageService
                ]
            })
            .overrideTemplate(StripeTransactionManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeTransactionManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeTransactionManageService);
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
