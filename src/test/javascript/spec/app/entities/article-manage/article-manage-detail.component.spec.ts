/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ELearningTestModule } from '../../../test.module';
import { ArticleManageDetailComponent } from '../../../../../../main/webapp/app/entities/article-manage/article-manage-detail.component';
import { ArticleManageService } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.service';
import { ArticleManage } from '../../../../../../main/webapp/app/entities/article-manage/article-manage.model';

describe('Component Tests', () => {

    describe('ArticleManage Management Detail Component', () => {
        let comp: ArticleManageDetailComponent;
        let fixture: ComponentFixture<ArticleManageDetailComponent>;
        let service: ArticleManageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ELearningTestModule],
                declarations: [ArticleManageDetailComponent],
                providers: [
                    ArticleManageService
                ]
            })
            .overrideTemplate(ArticleManageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticleManageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleManageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ArticleManage(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.article).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
