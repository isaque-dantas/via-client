import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../interfaces/order';
import {LocalDatePipe} from '../../pipes/local-date.pipe';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DecimalWithTwoDigitsPipe} from '../../pipes/decimal-with-two-digits.pipe';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-order-detail',
  imports: [
    LocalDatePipe,
    RouterLink,
    DecimalWithTwoDigitsPipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  order?: Order
  orderId?: number

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly orderService = inject(OrderService);

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.orderId = parseInt(data.id)

      this.orderService.get(this.orderId).subscribe({
        next: order => {
          this.order = order
          console.log(order)
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 404) {
            this.alertService.error(`O pedido #${this.orderId} não foi encontrado.`)
            this.router.navigateByUrl('/dashboard')
            return;
          }

          this.alertService.error(response.message)
        }
      })
    })
  }

  updateOrderStatus(event: Event) {
    this.orderService.patch(this.orderId!, (event.target as HTMLInputElement).value).subscribe({
      next: () => this.alertService.success('O status foi atualizado com sucesso.'),
      error: (response: HttpErrorResponse) => this.alertService.error(response.message)
    })
  }
}
