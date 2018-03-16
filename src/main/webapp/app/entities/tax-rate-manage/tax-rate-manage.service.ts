import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TaxRateManage } from './tax-rate-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TaxRateManageService {

    private resourceUrl =  SERVER_API_URL + 'api/tax-rates';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tax-rates';

    constructor(private http: Http) { }

    create(taxRate: TaxRateManage): Observable<TaxRateManage> {
        const copy = this.convert(taxRate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(taxRate: TaxRateManage): Observable<TaxRateManage> {
        const copy = this.convert(taxRate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TaxRateManage> {
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
     * Convert a returned JSON object to TaxRateManage.
     */
    private convertItemFromServer(json: any): TaxRateManage {
        const entity: TaxRateManage = Object.assign(new TaxRateManage(), json);
        return entity;
    }

    /**
     * Convert a TaxRateManage to a JSON which can be sent to the server.
     */
    private convert(taxRate: TaxRateManage): TaxRateManage {
        const copy: TaxRateManage = Object.assign({}, taxRate);
        return copy;
    }
}
