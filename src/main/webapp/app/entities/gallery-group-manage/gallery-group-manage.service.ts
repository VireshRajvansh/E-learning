import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GalleryGroupManage } from './gallery-group-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GalleryGroupManageService {

    private resourceUrl =  SERVER_API_URL + 'api/gallery-groups';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/gallery-groups';

    constructor(private http: Http) { }

    create(galleryGroup: GalleryGroupManage): Observable<GalleryGroupManage> {
        const copy = this.convert(galleryGroup);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(galleryGroup: GalleryGroupManage): Observable<GalleryGroupManage> {
        const copy = this.convert(galleryGroup);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GalleryGroupManage> {
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
     * Convert a returned JSON object to GalleryGroupManage.
     */
    private convertItemFromServer(json: any): GalleryGroupManage {
        const entity: GalleryGroupManage = Object.assign(new GalleryGroupManage(), json);
        return entity;
    }

    /**
     * Convert a GalleryGroupManage to a JSON which can be sent to the server.
     */
    private convert(galleryGroup: GalleryGroupManage): GalleryGroupManage {
        const copy: GalleryGroupManage = Object.assign({}, galleryGroup);
        return copy;
    }
}
