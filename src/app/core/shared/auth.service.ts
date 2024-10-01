import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Register } from './../models/register';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { GenericServiceService } from './generic-service.service';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment.prod';
import { LoginInt } from '../models/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userInformation : any ; 
  constructor( private _GenericServiceService:GenericServiceService , private _HttpClient:HttpClient) { }
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
  // register(createUser:Register):Observable<Register>{
  //  return this._GenericServiceService.creat(createUser , 'api/v1/user/register' )
  // }
  Register(creatUser:Register):Observable<any>{
    return this._HttpClient.post(`${enviroment.APIURL}/api/v1/user/register` , creatUser).pipe(
      retry(3) , 
      // catchError(this.handleError)
    )
  }
  LoginUser(loginUser:any):Observable<any>{
    return this._HttpClient.post(`${enviroment.APIURL}/api/v1/user/login` , loginUser)
  }

  decodeUser():void{
    const encode = localStorage.getItem("USER")
    if(encode !== null){
        const decode = jwtDecode(encode)
        this.userInformation = decode;
    }
  }




}
