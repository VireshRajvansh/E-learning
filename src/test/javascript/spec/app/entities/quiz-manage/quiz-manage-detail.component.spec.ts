/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { QuizManageDetailComponent } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage-detail.component';
import { QuizManageService } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.service';
import { QuizManage } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.model';

describe('Component Tests', () => {

    describe('QuizManage Management Detail Component', () => {
        let comp: QuizManageDetailComponent;
        let fixture: ComponentFixture<QuizManageDetailComponent>;
        let service: QuizManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizManageDetailComponent],
                providers: [
                    QuizManageService
                ]
            })
            .overrideTemplate(QuizManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuizManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quiz).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
