import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TeacherManage } from './teacher-manage.model';
import { TeacherManageService } from './teacher-manage.service';

@Injectable()
export class TeacherManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private teacherService: TeacherManageService

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
                this.teacherService.find(id).subscribe((teacher) => {
                    if (teacher.dob) {
                        teacher.dob = {
                            year: teacher.dob.getFullYear(),
                            month: teacher.dob.getMonth() + 1,
                            day: teacher.dob.getDate()
                        };
                    }
                    if (teacher.premiumTill) {
                        teacher.premiumTill = {
                            year: teacher.premiumTill.getFullYear(),
                            month: teacher.premiumTill.getMonth() + 1,
                            day: teacher.premiumTill.getDate()
                        };
                    }
                    this.ngbModalRef = this.teacherModalRef(component, teacher);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.teacherModalRef(component, new TeacherManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    teacherModalRef(component: Component, teacher: TeacherManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.teacher = teacher;
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
