import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthService],
})
export class AuthComponent {
  SnackbarDurationInSeconds = 3;

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(8)]);

  passwordMatch = (control: FormControl): { [s: string]: boolean } | null => {
    return this.password.value === control.value ? null : { mismatch: true };
  };

  retype_password = new FormControl('', [
    Validators.required,
    Validators.min(8),
    this.passwordMatch,
  ]);

  firstName = new FormControl('', [Validators.required, Validators.min(1)]);

  authType: string = 'login';

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() {
    return this.firstName.hasError('required')
      ? 'You must enter your first name'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.retype_password.hasError('mismatch')
      ? "Passwords don't match"
      : '';
  }

  onChangeAuthType(): void {
    this.authType == 'register'
      ? (this.authType = 'login')
      : (this.authType = 'register');
    this.email.reset();
    this.password.reset();
    this.retype_password.reset();
    this.firstName.reset();
  }

  onLogin() {
    let email = this.email.getRawValue()!;
    let password = this.password.getRawValue()!;
    console.log(email, password);
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.openSnackBar('Login Successful');
        // TODO: to send user id in order to get the auction lists it has
        // this.router.navigate(['/', 'dashboard']);
        this.router.navigateByUrl("/dashboard")
      },
      error: (error) => {
        this.openSnackBar('Login Failed: ' + error.message);
      },
    });
  }

  onRegister() {
    let firstName = this.firstName.getRawValue()!;
    let email = this.email.getRawValue()!;
    let password = this.password.getRawValue()!;
    let retype_password = this.retype_password.getRawValue()!;

    this.authService.register(firstName, email, password, retype_password).subscribe({
      next: (response) => {
        this.openSnackBar('Registration Successful');
      },
      error: (error) => {
        this.openSnackBar('Registration Failed: ' + error.message);
      },
    });
  }

  openSnackBar(message: string) {
    var action = '';
    this._snackBar.open(message, action, {
      duration: this.SnackbarDurationInSeconds * 1000,
    });
  }

  isFormValid(): boolean {
    if (this.email.value === 'admin') {
      return this.password.valid; // Only check password for admin
    }

    if (this.authType === 'login') {
      return this.email.valid && this.password.valid;
    } else if (this.authType === 'register') {
      return (
        this.email.valid &&
        this.password.valid &&
        this.retype_password.valid &&
        this.firstName.valid
      );
    }
    return false;
  }
}
