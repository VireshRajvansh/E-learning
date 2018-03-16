/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { ServicesManageComponent } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.component';
import { ServicesManageService } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.service';
import { ServicesManage } from '../../../../../../main/webapp/app/entities/services-manage/services-manage.model';

describe('Component Tests', () => {

    describe('ServicesManage Management Component', () => {
        let comp: ServicesManageComponent;
        let fixture: ComponentFixture<ServicesManageComponent>;
        let service: ServicesManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ServicesManageComponent],
                providers: [
                    ServicesManageService
                ]
            })
            .overrideTemplate(ServicesManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicesManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServicesManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.services[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
