/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { ArticleManageDialogComponent } from '../../../../../../main/webapp/app/entities/article-manage/article-manage-dialog.component';
import { ArticleManageService } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.service';
import { ArticleManage } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('ArticleManage Management Dialog Component', () => {
        let comp: ArticleManageDialogComponent;
        let fixture: ComponentFixture<ArticleManageDialogComponent>;
        let service: ArticleManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ArticleManageDialogComponent],
                providers: [
                    UserService,
                    ArticleManageService
                ]
            })
            .overrideTemplate(ArticleManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticleManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ArticleManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.article = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'articleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ArticleManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.article = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'articleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
