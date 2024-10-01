import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs'
import { enviroment } from '../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {
  httpOption: any;

  constructor(private _HttpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend return code ${error.status} , Bad Was : `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something Bad happen ; please try again later ')
    );
  }
  private setHeader(key: string, value: string) {
    this.httpOption.headers.set(key, value)
  }

  creat(body : any  , endPoint : string):Observable<any>{
    return   this._HttpClient.post(`${enviroment}/${endPoint}` , body , this.httpOption).pipe(
        retry(3) , 
        catchError (this.handleError)
      )
  }


}
