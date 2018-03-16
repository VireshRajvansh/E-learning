/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageDialogComponent } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage-dialog.component';
import { PlayListManageService } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.service';
import { PlayListManage } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.model';

describe('Component Tests', () => {

    describe('PlayListManage Management Dialog Component', () => {
        let comp: PlayListManageDialogComponent;
        let fixture: ComponentFixture<PlayListManageDialogComponent>;
        let service: PlayListManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageDialogComponent],
                providers: [
                    PlayListManageService
                ]
            })
            .overrideTemplate(PlayListManageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListManageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PlayListManage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.playList = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'playListListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PlayListManage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.playList = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'playListListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
