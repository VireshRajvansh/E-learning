import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PlayListManage } from './play-list-manage.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PlayListManageService {

    private resourceUrl =  SERVER_API_URL + 'api/play-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/play-lists';

    constructor(private http: Http) { }

    create(playList: PlayListManage): Observable<PlayListManage> {
        const copy = this.convert(playList);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(playList: PlayListManage): Observable<PlayListManage> {
        const copy = this.convert(playList);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PlayListManage> {
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
     * Convert a returned JSON object to PlayListManage.
     */
    private convertItemFromServer(json: any): PlayListManage {
        const entity: PlayListManage = Object.assign(new PlayListManage(), json);
        return entity;
    }

    /**
     * Convert a PlayListManage to a JSON which can be sent to the server.
     */
    private convert(playList: PlayListManage): PlayListManage {
        const copy: PlayListManage = Object.assign({}, playList);
        return copy;
    }
}
