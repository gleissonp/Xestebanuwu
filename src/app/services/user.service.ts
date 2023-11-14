import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    registerUser(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/micontrolador`, data);
    }

    loginAndRedirect(correo: string, contrasena: string): Observable<any> {
        const data = {
            correo: correo,
            contrasena: contrasena
        };

        return this.http.post<any>(`${this.apiUrl}/api/login`, data);
    }

    login(correo: string, contrasena: string): Observable<any> {
        const data = {
            correo: correo,
            contrasena: contrasena
        };

        return this.http.post<any>(`${this.apiUrl}/api/login`, data).pipe(
            tap(response => {
                if (response && response.token) {
                    this.authService.setCredentials(response.correo, response.token);
                }
            })
        );
    }

    logout(): void {
        this.authService.clearCredentials();
    }

}
