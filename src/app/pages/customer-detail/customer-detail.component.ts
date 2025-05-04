import {Component, inject, OnInit} from '@angular/core';
import {Customer} from '../../interfaces/customer';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HeaderComponent} from '../../components/header/header.component';
import {LocalDatePipe} from '../../pipes/local-date.pipe';
import {AsyncPipe} from '@angular/common';
import {Order} from '../../interfaces/order';
import {Observable} from 'rxjs';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-customer-detail',
  imports: [
    HeaderComponent,
    RouterLink,
    LocalDatePipe,
    AsyncPipe
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customer

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  customerService = inject(CustomerService)
  orderService = inject(OrderService)
  alertService = inject(AlertService)
  orders$!: Observable<Order[]>;

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const id = data.id

      this.customerService.get(id).subscribe({
        next: customer => {
          this.customer = customer
          console.log(customer)
        },
        error: (response: HttpErrorResponse) => this.handleGetError(response, id)
      })

      this.orders$ = this.orderService.getRelatedToCustomer(id)
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
