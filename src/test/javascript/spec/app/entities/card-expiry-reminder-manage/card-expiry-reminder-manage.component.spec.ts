/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { CardExpiryReminderManageComponent } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.component';
import { CardExpiryReminderManageService } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.service';
import { CardExpiryReminderManage } from '../../../../../../main/webapp/app/entities/card-expiry-reminder-manage/card-expiry-reminder-manage.model';

describe('Component Tests', () => {

    describe('CardExpiryReminderManage Management Component', () => {
        let comp: CardExpiryReminderManageComponent;
        let fixture: ComponentFixture<CardExpiryReminderManageComponent>;
        let service: CardExpiryReminderManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CardExpiryReminderManageComponent],
                providers: [
                    CardExpiryReminderManageService
                ]
            })
            .overrideTemplate(CardExpiryReminderManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardExpiryReminderManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardExpiryReminderManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CardExpiryReminderManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cardExpiryReminders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
