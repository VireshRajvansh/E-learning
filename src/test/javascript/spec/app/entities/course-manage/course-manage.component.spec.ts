/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { CourseManageComponent } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.component';
import { CourseManageService } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.service';
import { CourseManage } from '../../../../../../main/webapp/app/entities/course-manage/course-manage.model';

describe('Component Tests', () => {

    describe('CourseManage Management Component', () => {
        let comp: CourseManageComponent;
        let fixture: ComponentFixture<CourseManageComponent>;
        let service: CourseManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [CourseManageComponent],
                providers: [
                    CourseManageService
                ]
            })
            .overrideTemplate(CourseManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CourseManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.courses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
