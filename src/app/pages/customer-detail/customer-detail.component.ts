import {Component, inject, OnInit} from '@angular/core';
import {Customer} from '../../interfaces/customer';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-customer-detail',
  imports: [],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customer

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  customerService = inject(CustomerService)
  alertService = inject(AlertService)

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const id = data.id

      this.customerService.get(id).subscribe({
        next: customer => {
          this.customer = customer
          console.log(customer)
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 404) {
            this.alertService.error(`O cliente #\'${id}\' não foi encontrado.`)
            this.router.navigateByUrl('/dashboard')
            return;
          }

          this.alertService.error(response.message)
        }
      })
    })
  }
}
