import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, retry } from 'rxjs';
import { enviroment } from '../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private _HttpClient:HttpClient) { }

  getProducts():Observable<any>{
    return this._HttpClient.get(`${enviroment.APIURL}/api/v1/product`)
  }
  getProductBySlug(slug:string | null):Observable<any>{
    return this._HttpClient.get(`${enviroment.APIURL}/api/v1/product/selected?product=${slug}`)
  }
  getCategories ():Observable<any>{
    return this._HttpClient.get(`${enviroment.APIURL}/api/v1/category/category-list`)
  }

}
