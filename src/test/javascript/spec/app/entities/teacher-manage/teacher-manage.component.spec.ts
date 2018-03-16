/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageComponent } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.component';
import { TeacherManageService } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.service';
import { TeacherManage } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.model';

describe('Component Tests', () => {

    describe('TeacherManage Management Component', () => {
        let comp: TeacherManageComponent;
        let fixture: ComponentFixture<TeacherManageComponent>;
        let service: TeacherManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageComponent],
                providers: [
                    TeacherManageService
                ]
            })
            .overrideTemplate(TeacherManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TeacherManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teachers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
