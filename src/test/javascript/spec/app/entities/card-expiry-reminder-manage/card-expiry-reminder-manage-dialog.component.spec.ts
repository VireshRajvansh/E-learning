/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageDialogComponent } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage-dialog.component';
import { CardExpiryReminderManageService } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.service';
import { CardExpiryReminderManage } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.model';

describe('Component Tests', () => {

    describe('CardExpiryReminderManage Management Dialog Component', () => {
        let comp: CardExpiryReminderManageDialogComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageDialogComponent>;
        let service: CardExpiryReminderManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageDialogComponent],
                providers: [
                    CardExpiryReminderManageService
                ]
            })
            .overrideTemplate(CardExpiryReminderManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardExpiryReminderManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardExpiryReminderManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardExpiryReminderManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.cardExpiryReminder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardExpiryReminderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CardExpiryReminderManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.cardExpiryReminder = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cardExpiryReminderListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
