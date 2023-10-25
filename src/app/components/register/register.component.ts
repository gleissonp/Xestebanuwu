import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})

export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue], // Agrega este control
      lastName: ['', Validators.required] // Agrega este control
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')!.value;
      const confirmEmail = this.registrationForm.get('confirmEmail')!.value;
      const password = this.registrationForm.get('password')!.value;
      const confirmPassword = this.registrationForm.get('confirmPassword')!.value;
      const name = this.registrationForm.get('name')!.value;
      const lastName = this.registrationForm.get('lastName')!.value;

      if (email !== confirmEmail) {
        // Manejar el error de correo electrónico no coincidente
        window.alert('Los correos electrónicos no coinciden.');
        return;
      }

      if (password !== confirmPassword) {
        // Manejar el error de contraseña no coincidente
        window.alert('Las contraseñas no coinciden.');
        return;
      }

      const registrationData = {
        nombres: name,
        apellidos: lastName,
        correo: email,
        contrasena: password
      };

      this.userService.registerUser(registrationData).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          window.alert('Registro exitoso');

          // Autentica al usuario después del registro exitoso
          this.userService.loginAndRedirect(email, password).subscribe(
            loginResponse => {
              console.log('Inicio de sesión exitoso:', loginResponse);
              // Redirige al usuario después del inicio de sesión exitoso
              // Por ejemplo, redirige a la página de inicio
              // this.router.navigate(['/home']);
            },
            loginError => {
              console.error('Error durante el inicio de sesión:', loginError);
              // Maneja el error adecuadamente
            }
          );
        },
        error => {
          console.error('Error durante el registro:', error);
          // Maneja el error adecuadamente
        }
      );

    }
  }
}
