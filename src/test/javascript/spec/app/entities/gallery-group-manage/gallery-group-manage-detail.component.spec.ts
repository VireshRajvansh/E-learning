/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { GalleryGroupManageDetailComponent } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage-detail.component';
import { GalleryGroupManageService } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.service';
import { GalleryGroupManage } from '../../../../../../main/webapp/app/entities/gallery-group-manage/gallery-group-manage.model';

describe('Component Tests', () => {

    describe('GalleryGroupManage Management Detail Component', () => {
        let comp: GalleryGroupManageDetailComponent;
        let fixture: ComponentFixture<GalleryGroupManageDetailComponent>;
        let service: GalleryGroupManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [GalleryGroupManageDetailComponent],
                providers: [
                    GalleryGroupManageService
                ]
            })
            .overrideTemplate(GalleryGroupManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GalleryGroupManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryGroupManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GalleryGroupManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.galleryGroup).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
