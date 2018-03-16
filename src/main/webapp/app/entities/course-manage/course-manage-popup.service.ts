import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CourseManage } from './course-manage.model';
import { CourseManageService } from './course-manage.service';

@Injectable()
export class CourseManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private courseService: CourseManageService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.courseService.find(id).subscribe((course) => {
                    if (course.premiumTill) {
                        course.premiumTill = {
                            year: course.premiumTill.getFullYear(),
                            month: course.premiumTill.getMonth() + 1,
                            day: course.premiumTill.getDate()
                        };
                    }
                    this.ngbModalRef = this.courseModalRef(component, course);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.courseModalRef(component, new CourseManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    courseModalRef(component: Component, course: CourseManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.course = course;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
