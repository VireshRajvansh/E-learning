/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { PlayListManageComponent } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.component';
import { PlayListManageService } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.service';
import { PlayListManage } from '../../../../../../main/webapp/app/entities/play-list-manage/play-list-manage.model';

describe('Component Tests', () => {

    describe('PlayListManage Management Component', () => {
        let comp: PlayListManageComponent;
        let fixture: ComponentFixture<PlayListManageComponent>;
        let service: PlayListManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [PlayListManageComponent],
                providers: [
                    PlayListManageService
                ]
            })
            .overrideTemplate(PlayListManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayListManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayListManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PlayListManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.playLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
