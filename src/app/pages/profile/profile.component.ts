import {Component, inject, OnInit} from '@angular/core';
import {Employee} from '../../interfaces/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent
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

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      const email = data.email

      this.employeeService.get(email).subscribe({
        next: employee => {
          this.employee = employee
          console.log(employee)
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 404) {
            this.alertService.error(`O usuário com e-mail \'${email}\' não foi encontrado.`)
            this.router.navigateByUrl('/dashboard')
            return;
          }

          this.alertService.error(response.message)
        }
      })
    })
  }
}
