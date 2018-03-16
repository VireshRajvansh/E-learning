/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { JobsManageDetailComponent } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage-detail.component';
import { JobsManageService } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.service';
import { JobsManage } from '../../../../../../main/webapp/app/entities/jobs-manage/jobs-manage.model';

describe('Component Tests', () => {

    describe('JobsManage Management Detail Component', () => {
        let comp: JobsManageDetailComponent;
        let fixture: ComponentFixture<JobsManageDetailComponent>;
        let service: JobsManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [JobsManageDetailComponent],
                providers: [
                    JobsManageService
                ]
            })
            .overrideTemplate(JobsManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobsManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobsManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new JobsManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobs).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
