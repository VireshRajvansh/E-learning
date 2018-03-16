/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { OfferManageComponent } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.component';
import { OfferManageService } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.service';
import { OfferManage } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.model';

describe('Component Tests', () => {

    describe('OfferManage Management Component', () => {
        let comp: OfferManageComponent;
        let fixture: ComponentFixture<OfferManageComponent>;
        let service: OfferManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [OfferManageComponent],
                providers: [
                    OfferManageService
                ]
            })
            .overrideTemplate(OfferManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OfferManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
