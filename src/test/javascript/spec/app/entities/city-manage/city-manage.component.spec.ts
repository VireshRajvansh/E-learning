/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { CityManageComponent } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.component';
import { CityManageService } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.service';
import { CityManage } from '../../../../../../main/webapp/app/entities/city-manage/city-manage.model';

describe('Component Tests', () => {

    describe('CityManage Management Component', () => {
        let comp: CityManageComponent;
        let fixture: ComponentFixture<CityManageComponent>;
        let service: CityManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CityManageComponent],
                providers: [
                    CityManageService
                ]
            })
            .overrideTemplate(CityManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CityManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
