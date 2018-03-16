/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { TeacherManageDetailComponent } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage-detail.component';
import { TeacherManageService } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.service';
import { TeacherManage } from '../../../../../../main/webapp/app/entities/teacher-manage/teacher-manage.model';

describe('Component Tests', () => {

    describe('TeacherManage Management Detail Component', () => {
        let comp: TeacherManageDetailComponent;
        let fixture: ComponentFixture<TeacherManageDetailComponent>;
        let service: TeacherManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [TeacherManageDetailComponent],
                providers: [
                    TeacherManageService
                ]
            })
            .overrideTemplate(TeacherManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new TeacherManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.teacher).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
