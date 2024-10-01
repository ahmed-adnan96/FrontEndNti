import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { enviroment } from '../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myToken:any ={
    token: localStorage.getItem('USER')
  } 
  constructor(private _HttpClient:HttpClient) { }


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







  addToCart(productId:string , quantity:any ):Observable<any>{
    return this._HttpClient.post(`${enviroment.APIURL}/api/v1/cart/${productId}` , {
       
      quantity
    } , {
      headers: this.myToken
    })
  }
  getCart():Observable<any>{
    const token = localStorage.getItem('USER');
    return this._HttpClient.get(`${enviroment.APIURL}/api/v1/cart`  , {
      headers: {
        token: localStorage.getItem('USER') || '' 

      }      
      
      
      
    }).pipe(
      retry(3),
  
      
    )
  }

}
