/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageDetailComponent } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage-detail.component';
import { CardExpiryReminderManageService } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.service';
import { CardExpiryReminderManage } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.model';

describe('Component Tests', () => {

    describe('CardExpiryReminderManage Management Detail Component', () => {
        let comp: CardExpiryReminderManageDetailComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageDetailComponent>;
        let service: CardExpiryReminderManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageDetailComponent],
                providers: [
                    CardExpiryReminderManageService
                ]
            })
            .overrideTemplate(CardExpiryReminderManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardExpiryReminderManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardExpiryReminderManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CardExpiryReminderManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cardExpiryReminder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
