/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { StripeCustomerManageComponent } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.component';
import { StripeCustomerManageService } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.service';
import { StripeCustomerManage } from '../../../../../../main/webapp/app/entities/stripe-customer-manage/stripe-customer-manage.model';

describe('Component Tests', () => {

    describe('StripeCustomerManage Management Component', () => {
        let comp: StripeCustomerManageComponent;
        let fixture: ComponentFixture<StripeCustomerManageComponent>;
        let service: StripeCustomerManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [StripeCustomerManageComponent],
                providers: [
                    StripeCustomerManageService
                ]
            })
            .overrideTemplate(StripeCustomerManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StripeCustomerManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StripeCustomerManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StripeCustomerManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stripeCustomers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
