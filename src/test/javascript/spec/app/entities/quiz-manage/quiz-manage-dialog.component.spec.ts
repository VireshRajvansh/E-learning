/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { QuizManageDialogComponent } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage-dialog.component';
import { QuizManageService } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.service';
import { QuizManage } from '../../../../../../main/webapp/app/entities/quiz-manage/quiz-manage.model';
import { QuizAnsManageService } from '../../../../../../main/webapp/app/entities/quiz-ans-manage';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('QuizManage Management Dialog Component', () => {
        let comp: QuizManageDialogComponent;
        let fixture: ComponentFixture<QuizManageDialogComponent>;
        let service: QuizManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [QuizManageDialogComponent],
                providers: [
                    QuizAnsManageService,
                    UserService,
                    QuizManageService
                ]
            })
            .overrideTemplate(QuizManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuizManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuizManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.quiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuizManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.quiz = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'quizListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
