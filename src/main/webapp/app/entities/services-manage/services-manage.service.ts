import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServicesManage } from './services-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServicesManageService {

    private resourceUrl =  SERVER_API_URL + 'api/services';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/services';

    constructor(private http: Http) { }

    create(services: ServicesManage): Observable<ServicesManage> {
        const copy = this.convert(services);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(services: ServicesManage): Observable<ServicesManage> {
        const copy = this.convert(services);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServicesManage> {
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
     * Convert a returned JSON object to ServicesManage.
     */
    private convertItemFromServer(json: any): ServicesManage {
        const entity: ServicesManage = Object.assign(new ServicesManage(), json);
        return entity;
    }

    /**
     * Convert a ServicesManage to a JSON which can be sent to the server.
     */
    private convert(services: ServicesManage): ServicesManage {
        const copy: ServicesManage = Object.assign({}, services);
        return copy;
    }
}
