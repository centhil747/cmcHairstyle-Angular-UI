import { Injectable } from '@angular/core';
import { Picture } from '../shared/picture';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPicture(id: string): Observable<Picture> {
    return this.http.get<Picture>(baseURL + 'Pictures/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getSoloPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(baseURL + 'Pictures?type=solo')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getGroupPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(baseURL + 'Pictures?type=group')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(baseURL + 'Pictures')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedSoloPicture(): Observable<Picture> {
    return this.http.get<Picture[]>(baseURL + 'Pictures?type=solo&featured=true').pipe(map(pictures => pictures[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedGroupPicture(): Observable<Picture> {
    return this.http.get<Picture[]>(baseURL + 'Pictures?type=group&featured=true').pipe(map(pictures => pictures[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPictureIds(): Observable<number[] | any> {
    return this.getPictures().pipe(map(pictures => pictures.map(Picture => Picture._id)))
      .pipe(catchError(error => error));
  }

  getSoloPictureIds(): Observable<number[] | any> {
    return this.getPictures().pipe(map(pictures => pictures.map(Picture => Picture._id)))
      .pipe(catchError(error => error));
  }

  getGroupPictureIds(): Observable<number[] | any> {
    return this.getPictures().pipe(map(pictures => pictures.map(Picture => Picture._id)))
      .pipe(catchError(error => error));
  }

  postComment(PictureId: string, comment: any) {
    return this.http.post(baseURL + 'Pictures/' + PictureId + '/comments', comment)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
