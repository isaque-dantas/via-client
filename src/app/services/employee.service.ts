import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginData} from '../interfaces/login-data';
import {baseApiUrl} from '../app.config';
import {Employee} from '../interfaces/employee';
import {tap} from 'rxjs';
import {AuthService} from './auth.service';
import {TokenResponse} from '../interfaces/token-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient)
  authService = inject(AuthService)

  login(loginData: LoginData) {
    return this.http.post<TokenResponse>(`${baseApiUrl}/token`, loginData)
      .pipe(tap(this.authService.login))
  }

  register(employee: Employee) {
    return this.http.post<Employee>(`${baseApiUrl}/employee`, employee)
  }

  get(email: string) {
    return this.http.get<Employee>(`${baseApiUrl}/employee/${email}`)
  }
}
