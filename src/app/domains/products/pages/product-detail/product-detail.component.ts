import { Component, Input, inject, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  private productsService = inject(ProductService);
  cover = signal('');

  ngOnInit() {
    if (this.id) {
      this.productsService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
      });
    }
  }
  changeCover(newImg: string) {
    this.cover.set(newImg);
  }
}
