/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageComponent } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.component';
import { EducationManageService } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.service';
import { EducationManage } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.model';

describe('Component Tests', () => {

    describe('EducationManage Management Component', () => {
        let comp: EducationManageComponent;
        let fixture: ComponentFixture<EducationManageComponent>;
        let service: EducationManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageComponent],
                providers: [
                    EducationManageService
                ]
            })
            .overrideTemplate(EducationManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EducationManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.educations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
