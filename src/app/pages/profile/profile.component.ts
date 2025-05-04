import {Component, inject, OnInit} from '@angular/core';
import {Employee} from '../../interfaces/employee';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HeaderComponent} from '../../components/header/header.component';
import {AsyncPipe} from '@angular/common';
import {LocalDatePipe} from '../../pipes/local-date.pipe';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../interfaces/order';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    AsyncPipe,
    LocalDatePipe,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  employee?: Employee

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  employeeService = inject(EmployeeService)
  alertService = inject(AlertService)

  orderService = inject(OrderService)
  orders$!: Observable<Order[]>;


  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const email = data.email

      if (email == undefined) {
        this.employeeService.getLogged().subscribe({
          next: employee => {
            this.employee = employee
            this.orders$ = this.orderService.getRelatedToEmployee(employee.email)
          },
          error: (response: HttpErrorResponse) => this.handleGetError(response, email)
        })

        return;
      }

      this.employeeService.get(email).subscribe({
        next: employee => this.employee = employee,
        error: (response: HttpErrorResponse) => this.handleGetError(response, email)
      })

      this.orders$ = this.orderService.getRelatedToEmployee(email)
    })
  }

  handleGetError(response: HttpErrorResponse, email: string) {
    if (response.status === 404) {
      this.alertService.error(`O usuário com e-mail \'${email}\' não foi encontrado.`)
      this.router.navigateByUrl('/dashboard')
      return;
    }

    this.alertService.error(response.message)
  }
}
