import {EventEmitter, inject, Injectable} from '@angular/core';
import {TokenResponse} from '../interfaces/token-response';
import {Employee} from '../interfaces/employee';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatusChanged = new EventEmitter<void>()
  router = inject(Router)

  login(responseBody: TokenResponse) {
    if (responseBody.access === undefined) return;

    localStorage.setItem('access', responseBody.access)
  }

  logout() {
    localStorage.clear()
    this.emitStatusChanged()
    this.router.navigateByUrl('/inicio')
  }

  emitStatusChanged() {
    this.authStatusChanged.emit()
  }

  isAuthenticated(): boolean {
    return this.doesAccessTokenExist() && !this.isAccessTokenExpired()
  }

  isAccessTokenExpired(): boolean {
    if (!this.doesAccessTokenExist()) return true

    const token: string = localStorage.getItem('access')!
    const encodedTokenPayload = token.split('.')[1]
    const decodedTokenPayload = JSON.parse(atob(encodedTokenPayload))
    const exp = decodedTokenPayload.exp

    if (!exp) return true

    const expirationDate = new Date(exp * 1000).getTime()
    const currentDate = new Date().getTime()

    return currentDate >= expirationDate
  }

  doesAccessTokenExist() {
    return !!localStorage.getItem('access');
  }

  getToken(): string | null {
    if (!this.isAuthenticated()) return null

    return "Bearer " + localStorage.getItem('access');
  }
}
