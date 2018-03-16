/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageComponent } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.component';
import { GalleryGroupManageService } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.service';
import { GalleryGroupManage } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.model';

describe('Component Tests', () => {

    describe('GalleryGroupManage Management Component', () => {
        let comp: GalleryGroupManageComponent;
        let fixture: ComponentFixture<GalleryGroupManageComponent>;
        let service: GalleryGroupManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageComponent],
                providers: [
                    GalleryGroupManageService
                ]
            })
            .overrideTemplate(GalleryGroupManageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryGroupManageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryGroupManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GalleryGroupManage(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.galleryGroups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
