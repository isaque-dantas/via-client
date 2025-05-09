import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {AlertService} from '../../services/alert.service';
import {LoginData} from '../../interfaces/login-data';
import {HttpErrorResponse} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }
  )

  employeeService = inject(EmployeeService)
  alertService = inject(AlertService)
  authService = inject(AuthService)
  router = inject(Router)

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.error('O formulário é inválido')
      return;
    }

    this.employeeService.login(this.form.value as LoginData).subscribe(
      {
        next: () => {
          this.alertService.success('O login foi realizado com sucesso!')
          this.router.navigateByUrl('dashboard').then(() => this.authService.emitStatusChanged())
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.alertService.error('E-mail e/ou senha incorreto(s).')
            return;
          }

          this.alertService.error(error.message)
        },
      }
    )
  }
}
