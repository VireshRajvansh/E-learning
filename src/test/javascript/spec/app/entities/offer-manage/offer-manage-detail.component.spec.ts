/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { OfferManageDetailComponent } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage-detail.component';
import { OfferManageService } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.service';
import { OfferManage } from '../../../../../../main/webapp/app/entities/offer-manage/offer-manage.model';

describe('Component Tests', () => {

    describe('OfferManage Management Detail Component', () => {
        let comp: OfferManageDetailComponent;
        let fixture: ComponentFixture<OfferManageDetailComponent>;
        let service: OfferManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [OfferManageDetailComponent],
                providers: [
                    OfferManageService
                ]
            })
            .overrideTemplate(OfferManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OfferManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.offer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
