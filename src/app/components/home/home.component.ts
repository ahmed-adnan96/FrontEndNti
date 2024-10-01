import { Image } from './../../core/models/product-inr';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/shared/products.service';
import { ProductInr } from 'src/app/core/models/product-inr';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/core/models/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/shared/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductInr[] = []
  categories: Categories[] = [];
  productsSub!: Subscription;
  categSub !: Subscription;
  subscribe: Subscription[] = [];
  constructor(private _ProductsService: ProductsService , private _CartService:CartService , private _ToastrService: ToastrService , private _Renderer2:Renderer2) { }
  ngOnInit(): void {
    this.productsSub = this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.categSub = this._ProductsService.getCategories().subscribe({
      next: (response) => {

        this.categories = response;
        console.log("This category => ",this.categories);
        
      },
      error: (err) => {
        console.log("error => " ,  err);

      }
    })


    this.subscribe.push(this.productsSub, this.categSub)


  }



  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true ,
    autoplayTimeout:3000,
    autoplaySpeed:5000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true ,
    autoplayTimeout:2000,
    autoplaySpeed:3000,
    navText: ['', ''],
    items:1
    ,
    nav: false
  }





  addProdToCart(idProd:string  , quantityProd:any ,element:HTMLButtonElement):void{
    console.log("ID PROD => " , idProd);
    console.log("quantity Prod" , quantityProd);
    
    console.log(element);
    
    // console.log("QUANTIT" , quantityProd);
    this._Renderer2.setAttribute(element , "disabled" , "true")
    
     this._CartService.addToCart(idProd  , quantityProd).subscribe({
      next : (res)=>{
        console.log('Add To cart' , res);
        this._ToastrService.success(res.message)
        this._Renderer2.removeAttribute(element , "disabled")
      } , 
      error : (err)=>{
        console.log("Not Add " , err);
        this._ToastrService.error(err.message); 
        this._Renderer2.removeAttribute(element , "disabled")
      }
     })
      
  }





  ngOnDestroy(): void {
    this.subscribe.forEach((sub) => {
      sub.unsubscribe()
    })


  }


}
