import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(private authService: UserService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.correo, this.contrasena).subscribe((response: any) => {
      // Redirige al usuario al componente home después de un inicio de sesión exitoso
      this.router.navigate(['/']);
    }, (error: any) => {
      // Maneja errores, por ejemplo, muestra un mensaje de error al usuario.
      window.alert("Error al iniciar sesión.");
    });
  }
}
