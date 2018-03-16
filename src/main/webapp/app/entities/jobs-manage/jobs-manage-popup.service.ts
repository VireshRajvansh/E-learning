import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JobsManage } from './jobs-manage.model';
import { JobsManageService } from './jobs-manage.service';

@Injectable()
export class JobsManagePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jobsService: JobsManageService

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
                this.jobsService.find(id).subscribe((jobs) => {
                    if (jobs.runon) {
                        jobs.runon = {
                            year: jobs.runon.getFullYear(),
                            month: jobs.runon.getMonth() + 1,
                            day: jobs.runon.getDate()
                        };
                    }
                    this.ngbModalRef = this.jobsModalRef(component, jobs);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobsModalRef(component, new JobsManage());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobsModalRef(component: Component, jobs: JobsManage): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobs = jobs;
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
