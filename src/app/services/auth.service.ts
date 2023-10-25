import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private correoKey = 'correo';
    private tokenKey = 'token';

    setCredentials(correo: string, token: string): void {
        localStorage.setItem(this.correoKey, correo);
        localStorage.setItem(this.tokenKey, token);
    }

    getCorreo(): string {
        return localStorage.getItem(this.correoKey) || '';
    }

    getToken(): string {
        return localStorage.getItem(this.tokenKey) || '';
    }

    isLoggedIn(): boolean {
        return this.getToken() !== '';
    }

    clearCredentials(): void {
        localStorage.removeItem(this.correoKey);
        localStorage.removeItem(this.tokenKey);
    }
}
