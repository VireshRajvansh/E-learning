/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ELearningTestModule } from '../../../test.module';
import { EducationManageDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/education-manage/education-manage-delete-dialog.component';
import { EducationManageService } from '../../../../../../main/webapp/app/entities/education-manage/education-manage.service';

describe('Component Tests', () => {

    describe('EducationManage Management Delete Component', () => {
        let comp: EducationManageDeleteDialogComponent;
        let fixture: ComponentFixture<EducationManageDeleteDialogComponent>;
        let service: EducationManageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [EducationManageDeleteDialogComponent],
                providers: [
                    EducationManageService
                ]
            })
            .overrideTemplate(EducationManageDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EducationManageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationManageService);
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
