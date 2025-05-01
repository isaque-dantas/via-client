import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from '../../services/employee.service';
import {AlertService} from '../../services/alert.service';
import {LoginData} from '../../interfaces/login-data';
import {HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../../interfaces/employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }
  )

  employeeService = inject(EmployeeService)
  alertService = inject(AlertService)
  router = inject(Router)

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.error('O formulário é inválido')
      console.log(this.form.controls.password.errors)
      return;
    }

    this.employeeService.register(this.form.value as Employee).subscribe(
      {
        next: (employee: Employee) => {
          this.alertService.success(`O usuário '${employee.name}' foi criado com sucesso!`)
          this.router.navigateByUrl('login')
        },
        error: (error: HttpErrorResponse) => this.alertService.error(error.message),
      }
    )
  }
}
