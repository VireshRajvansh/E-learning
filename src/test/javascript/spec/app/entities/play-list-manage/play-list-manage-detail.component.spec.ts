/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageDetailComponent } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage-detail.component';
import { PlayListManageService } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.service';
import { PlayListManage } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.model';

describe('Component Tests', () => {

    describe('PlayListManage Management Detail Component', () => {
        let comp: PlayListManageDetailComponent;
        let fixture: ComponentFixture<PlayListManageDetailComponent>;
        let service: PlayListManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageDetailComponent],
                providers: [
                    PlayListManageService
                ]
            })
            .overrideTemplate(PlayListManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PlayListManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.playList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
