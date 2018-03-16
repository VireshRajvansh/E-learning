/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage-delete-dialog.component';
import { PlayListManageService } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.service';

describe('Component Tests', () => {

    describe('PlayListManage Management Delete Component', () => {
        let comp: PlayListManageDeleteDialogComponent;
        let fixture: ComponentFixture<PlayListManageDeleteDialogComponent>;
        let service: PlayListManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageDeleteDialogComponent],
                providers: [
                    PlayListManageService
                ]
            })
            .overrideTemplate(PlayListManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListManageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
