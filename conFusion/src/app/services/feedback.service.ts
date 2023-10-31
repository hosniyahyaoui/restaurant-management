import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { Observable, catchError, map } from 'rxjs';
import { baseURL } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedbacks')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getFeaturedFeedback(): Observable<Feedback> {
    return this.http.get<Feedback[]>(baseURL + 'feedbacks?featured=true').pipe(map(feedbacks => feedbacks[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  submitFeedback(feedback:Feedback) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  

}
