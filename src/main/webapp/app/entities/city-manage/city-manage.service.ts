import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CityManage } from './city-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CityManageService {

    private resourceUrl =  SERVER_API_URL + 'api/cities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cities';

    constructor(private http: Http) { }

    create(city: CityManage): Observable<CityManage> {
        const copy = this.convert(city);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(city: CityManage): Observable<CityManage> {
        const copy = this.convert(city);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CityManage> {
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
     * Convert a returned JSON object to CityManage.
     */
    private convertItemFromServer(json: any): CityManage {
        const entity: CityManage = Object.assign(new CityManage(), json);
        return entity;
    }

    /**
     * Convert a CityManage to a JSON which can be sent to the server.
     */
    private convert(city: CityManage): CityManage {
        const copy: CityManage = Object.assign({}, city);
        return copy;
    }
}
