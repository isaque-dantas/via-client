import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from '../../services/employee.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../../interfaces/employee';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.maxLength(128)]],
      email: ['', [Validators.required, Validators.email], Validators.maxLength(254)],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
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
