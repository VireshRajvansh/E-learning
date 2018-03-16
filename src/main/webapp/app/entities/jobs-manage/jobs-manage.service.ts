import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobsManage } from './jobs-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JobsManageService {

    private resourceUrl =  SERVER_API_URL + 'api/jobs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/jobs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(jobs: JobsManage): Observable<JobsManage> {
        const copy = this.convert(jobs);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(jobs: JobsManage): Observable<JobsManage> {
        const copy = this.convert(jobs);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<JobsManage> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to JobsManage.
     */
    private convertItemFromServer(json: any): JobsManage {
        const entity: JobsManage = Object.assign(new JobsManage(), json);
        entity.runon = this.dateUtils
            .convertLocalDateFromServer(json.runon);
        return entity;
    }

    /**
     * Convert a JobsManage to a JSON which can be sent to the server.
     */
    private convert(jobs: JobsManage): JobsManage {
        const copy: JobsManage = Object.assign({}, jobs);
        copy.runon = this.dateUtils
            .convertLocalDateToServer(jobs.runon);
        return copy;
    }
}
