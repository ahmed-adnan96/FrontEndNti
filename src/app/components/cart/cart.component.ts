import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/core/shared/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
constructor(private _HttpClient:HttpClient , private _CartService:CartService){}

ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next:(res)=>{
        console.log("res cart => " , res);
        
      } , 
      error :(err)=>{
        console.log("err cart " , err);
        
      }
    })
}


}
