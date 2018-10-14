import { Injectable } from '@angular/core';
import { Family } from '../shared/family';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFamilyDetails(): Observable<Family[]> {
    return this.http.get<Family[]>(baseURL + 'family?featured=false')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFamilyDetail(id: string): Observable<Family> {
    return this.http.get<Family>(baseURL + 'family/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedFamily(): Observable<Family> {
    return this.http.get<Family[]>(baseURL + 'family?featured=true').pipe(map(Familys => Familys[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
