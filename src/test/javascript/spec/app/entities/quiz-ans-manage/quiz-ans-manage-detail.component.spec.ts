/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { QuizAnsManageDetailComponent } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage-detail.component';
import { QuizAnsManageService } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.service';
import { QuizAnsManage } from '../../../../../../main/webapp/app/entities/quiz-ans-manage/quiz-ans-manage.model';

describe('Component Tests', () => {

    describe('QuizAnsManage Management Detail Component', () => {
        let comp: QuizAnsManageDetailComponent;
        let fixture: ComponentFixture<QuizAnsManageDetailComponent>;
        let service: QuizAnsManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizAnsManageDetailComponent],
                providers: [
                    QuizAnsManageService
                ]
            })
            .overrideTemplate(QuizAnsManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizAnsManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizAnsManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new QuizAnsManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.quizAns).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
