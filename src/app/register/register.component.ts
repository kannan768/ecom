import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast'; // Import ToastModule
import { MessageService } from 'primeng/api'; // Import MessageService

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  password!: boolean;
  hide!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject your authentication service
    private router: Router,
    private toastr:MessageService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password:['',Validators.required],
      address: ['', Validators.required]
      // Add more fields as per your requirements (password, cart, wishlist, etc.)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstname, lastname, email, mobile, password, address } = this.registerForm.value;

      // Check if email already exists
      this.authService.checkEmailExists(email).subscribe(
        (emailExists: boolean) => {
          if (emailExists) {
            this.toastr.add({
              severity: 'error',
              summary: 'Email already exist',
              detail: '',
            }); // Show toast message for email existence
          } else {
            // Check if mobile number already exists
            this.authService.checkMobileExists(mobile).subscribe(
              (mobileExists: boolean) => {
                if (mobileExists) {
                  this.toastr.add({
                    severity: 'error',
                    summary: 'mobile number already exist',
                    detail: '',
                  });// Show toast message for mobile existence
                } else {
                  // Register the user if both email and mobile are unique
                  this.authService.register(firstname, lastname, email, mobile, password, address).subscribe(
                    (response) => {
                      console.log('Registration successful:', response);
                      this.toastr.add({
                        severity: 'success',
                        summary: 'Register success',
                        detail: '',
                      });// Show success toast message
                      // Redirect to login or another page after successful registration
                      this.router.navigate(['/login']);
                    },
                    (error) => {
                      console.error('Registration error:', error);
                      this.toastr.add({
                        severity: 'error',
                        summary: 'Register failed',
                        detail: '',
                      });// Show error toast message
                    }
                  );
                }
              },
              (error) => {
                console.error('Error checking mobile:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error checking email:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter valid information.'; // Example error message handling
    }
  }
  checkMaxLength(event: KeyboardEvent, controlName: string) {
    const maxLength = 25; // Set your max length here
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if ((event.target as HTMLInputElement).value.length >= maxLength && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  checkMaxLengthnumber(event: KeyboardEvent, controlName: string) {
    const maxLength = 10; // Set your max length here
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if ((event.target as HTMLInputElement).value.length >= maxLength&& !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
    const key = event.key;
    if (!/\d/.test(key) && !allowedKeys.includes(key)) {
      event.preventDefault();
    }

  }
  togglePasswordVisibility()
  {
    this.hide = !this.hide;
  }

  }


