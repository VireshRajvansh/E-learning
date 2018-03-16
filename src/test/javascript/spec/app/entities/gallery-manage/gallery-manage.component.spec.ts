/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { GalleryManageComponent } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.component';
import { GalleryManageService } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.service';
import { GalleryManage } from '../../../../../../main/webapp/app/entities/gallery-manage/gallery-manage.model';

describe('Component Tests', () => {

    describe('GalleryManage Management Component', () => {
        let comp: GalleryManageComponent;
        let fixture: ComponentFixture<GalleryManageComponent>;
        let service: GalleryManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryManageComponent],
                providers: [
                    GalleryManageService
                ]
            })
            .overrideTemplate(GalleryManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GalleryManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.galleries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
