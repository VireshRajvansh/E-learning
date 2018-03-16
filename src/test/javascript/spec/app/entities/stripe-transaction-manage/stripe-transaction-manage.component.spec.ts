/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { StripeTransactionManageComponent } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.component';
import { StripeTransactionManageService } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.service';
import { StripeTransactionManage } from '../../../../../../main/webapp/app/entities/stripe-transaction-manage/stripe-transaction-manage.model';

describe('Component Tests', () => {

    describe('StripeTransactionManage Management Component', () => {
        let comp: StripeTransactionManageComponent;
        let fixture: ComponentFixture<StripeTransactionManageComponent>;
        let service: StripeTransactionManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeTransactionManageComponent],
                providers: [
                    StripeTransactionManageService
                ]
            })
            .overrideTemplate(StripeTransactionManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeTransactionManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeTransactionManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StripeTransactionManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stripeTransactions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
