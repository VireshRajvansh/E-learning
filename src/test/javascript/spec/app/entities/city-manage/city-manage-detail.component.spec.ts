/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { CityManageDetailComponent } from '../../../../../../main/webapp/app/entities/city-manage/city-manage-detail.component';
import { CityManageService } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.service';
import { CityManage } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.model';

describe('Component Tests', () => {

    describe('CityManage Management Detail Component', () => {
        let comp: CityManageDetailComponent;
        let fixture: ComponentFixture<CityManageDetailComponent>;
        let service: CityManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CityManageDetailComponent],
                providers: [
                    CityManageService
                ]
            })
            .overrideTemplate(CityManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CityManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.city).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
