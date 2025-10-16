import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ isLogin ? 'Login' : 'Register' }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email">
            <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">Invalid email format</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password">
            <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</mat-error>
          </mat-form-field>

          <div class="button-container">
            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="!loginForm.valid">
              {{ isLogin ? 'Login' : 'Register' }}
            </button>
            <button mat-button type="button" (click)="toggleMode()">
              {{ isLogin ? 'Need an account?' : 'Already have an account?' }}
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 400px;
      margin: 2rem auto;
    }
    mat-card {
      padding: 2rem;
    }
    mat-card-header {
      margin-bottom: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    mat-form-field {
      width: 100%;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `]
})
export class LoginComponent {
  isLogin = true;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        if (this.isLogin) {
          await this.authService.login(email!, password!);
        } else {
          await this.authService.register(email!, password!);
        }
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.snackBar.open(error.message || 'Authentication failed', 'Close', {
          duration: 3000
        });
      }
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }
}