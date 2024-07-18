import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast'; // Import ToastModule
import { MessageService } from 'primeng/api'; // Import MessageService
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-verifylogin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    ToastModule,
    MatProgressBarModule,
  ],
  templateUrl: './verifylogin.component.html',
  styleUrl: './verifylogin.component.scss',
  providers: [MessageService],
})
export class VerifyloginComponent {
  otpForm: FormGroup;
  email: string | null = null;
  showProgressBar!: boolean;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.email = localStorage.getItem('email');
    }
  }
  constructor(
    private fb: FormBuilder,
    private otpService: AuthService,
    private router: Router,
    private MessageService: MessageService
  ) {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp6: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const input = event.target as HTMLInputElement;

    // if (['ArrowRight', 'ArrowLeft', 'Backspace', 'Delete'].includes(event.key)) {
    //   event.stopPropagation();
    // }

    if (event.key === 'ArrowRight') {
      const nextInput = document.querySelector(
        `input[formControlName=otp${currentIndex + 1}]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
        //nextInput.setSelectionRange(1, 1); // Set cursor to the end
      }
    } else if (event.key === 'ArrowLeft') {
      const prevInput = document.querySelector(
        `input[formControlName=otp${currentIndex - 1}]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        // prevInput.setSelectionRange(1, 1); // Set cursor to the end
      }
    } else if (event.key === 'Backspace') {
      if (!input.value) {
        const prevInput = document.querySelector(
          `input[formControlName=otp${currentIndex - 1}]`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          // prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length); // Set cursor to the end
        }
      } else {
        input.value = ''; // Clear the input value
      }
    } else if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  moveFocus(event: any, currentIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      const nextInput = document.querySelector(
        `input[formControlName=otp${currentIndex + 1}]`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  resendOTP(): void {
    if (this.email) {
      this.showProgressBar = true;
          setTimeout(() => {
            this.showProgressBar = false;
          }, 7000);
      this.otpService.resendotp(this.email).subscribe(
        (response) => {
          console.log('Resend OTP response:', response);
          this.MessageService.add({
            severity: 'success',
            summary: 'OTP resent successfully',
          });

        },
        (error) => {
          console.error('Resend OTP error:', error);
          this.MessageService.add({
            severity: 'error',
            summary: 'Failed to resend OTP. Please try again.',
          });
        }
      );
    }
  }
  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      if (this.email) {
        this.otpService.verifyOtp(this.email, otp).subscribe(
          (response) => {
            console.log('OTP verification response:', response);
            // Handle successful OTP verification, e.g., navigate to the dashboard
            this.router.navigate(['/product']);
          },
          (error) => {
            console.error('OTP verification error:', error);
            this.MessageService.add({
              severity: 'error',
              summary: 'Invalid otp. Please try again.',
              detail: '',
            });
          }
        );
      }
    }
  }
}
