import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/shared/products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  slug!: string | null;
  productdetails: any = null;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.slug = res.get('slug')
        console.log(this.slug);
      }
    })

    this._ProductsService.getProductBySlug(this.slug).subscribe({
      next: (res) => {
        this.productdetails = res.products
        console.log(res.products);

      }
    })

  }


}
