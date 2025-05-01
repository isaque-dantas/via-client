import {Injectable} from '@angular/core';
import {TokenResponse} from '../interfaces/token-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly accessTokenKey: string = 'access'

    login(responseBody: TokenResponse) {
        if (responseBody.access === undefined) return;

        localStorage.setItem(this.accessTokenKey, responseBody.access)
    }

    isAuthenticated(): boolean {
        return this.doesAccessTokenExist() && !this.isAccessTokenExpired()
    }

    isAccessTokenExpired(): boolean {
        if (!this.doesAccessTokenExist()) return true

        const token: string = localStorage.getItem(this.accessTokenKey)!
        const encodedTokenPayload = token.split('.')[1]
        const decodedTokenPayload = JSON.parse(atob(encodedTokenPayload))
        const exp = decodedTokenPayload.exp

        if (!exp) return true

        const expirationDate = new Date(exp * 1000).getTime()
        const currentDate = new Date().getTime()

        return currentDate >= expirationDate
    }

    doesAccessTokenExist() {
        return !!localStorage.getItem(this.accessTokenKey);
    }

    getToken(): string | null {
        if (!this.isAuthenticated()) return null

        return "Bearer " + localStorage.getItem(this.accessTokenKey);
    }
}
