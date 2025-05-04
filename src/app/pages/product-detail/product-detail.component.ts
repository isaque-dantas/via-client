import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DecimalWithTwoDigitsPipe} from '../../pipes/decimal-with-two-digits.pipe';
import {LocalDatePipe} from '../../pipes/local-date.pipe';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../interfaces/order';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    HeaderComponent,
    DecimalWithTwoDigitsPipe,
    LocalDatePipe,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: Product
  productService = inject(ProductService)

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  alertService = inject(AlertService)
  orderService = inject(OrderService)
  orders$!: Observable<Order[]>;

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const id = data.id

      this.productService.get(id).subscribe(
        {
          next: product => this.product = product,
          error: (response: HttpErrorResponse) => this.handleGetError(response, id)
        }
      )

      this.orders$ = this.orderService.getRelatedToProduct(id)
    })
  }

  handleGetError(response: HttpErrorResponse, id: number) {
    if (response.status === 404) {
      this.alertService.error(`O produto #\'${id}\' não foi encontrado.`)
      this.router.navigateByUrl('/dashboard')
      return;
    }

    this.alertService.error(response.message)
  }
}
