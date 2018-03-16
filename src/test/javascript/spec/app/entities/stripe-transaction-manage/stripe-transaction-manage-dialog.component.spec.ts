/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageDialogComponent } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage-dialog.component';
import { StripeTransactionManageService } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.service';
import { StripeTransactionManage } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.model';

describe('Component Tests', () => {

    describe('StripeTransactionManage Management Dialog Component', () => {
        let comp: StripeTransactionManageDialogComponent;
        let fixture: ComponentFixture<StripeTransactionManageDialogComponent>;
        let service: StripeTransactionManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageDialogComponent],
                providers: [
                    StripeTransactionManageService
                ]
            })
            .overrideTemplate(StripeTransactionManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeTransactionManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeTransactionManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripeTransactionManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.stripeTransaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripeTransactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StripeTransactionManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.stripeTransaction = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stripeTransactionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
