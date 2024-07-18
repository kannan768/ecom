

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast'; // Import ToastModule
import { MessageService } from 'primeng/api'; // Import MessageService
import { Router } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
     MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
  ToastModule,
  MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  email!: string;
  password!: string;
  hide!: boolean;
  value: number = 0;
  showProgressBar: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private MessageService:MessageService
  )

   {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
      this.showProgressBar = true;
      this.authService.login(this.email, this.password).subscribe(
        response => {
          localStorage.setItem('email', this.email);
          console.log('Login successful:', response);
          localStorage.setItem('islogin','true');
          // Redirect to verify login component or other logic after successful login
          this.router.navigate(['/verify']);
        },
        error => {
          console.error('Login error:', error);
          this.MessageService.add({
            severity: 'error',
            summary: 'Invalid credentials. Please try again.',
            detail: '',
          });
          localStorage.setItem('islogin','false');
          this.errorMessage = 'Invalid credentials. Please try again.';
          this.showProgressBar = false; // Example error message handling
        }
      );
    } else {
      this.errorMessage = 'Please enter valid credentials.'; // Example error message handling
    }
  }
  navigateToRegister()
  {
    this.router.navigate(['/register']);
  }
  navigateToResetPassword()
  {
    this.router.navigate(['/reset']);
  }
  togglePasswordVisibility()
  {
    this.hide = !this.hide;
  }
  checkMaxLength(event: KeyboardEvent, controlName: string) {
    const maxLength = 25; // Set your max length here
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if ((event.target as HTMLInputElement).value.length >= maxLength && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
