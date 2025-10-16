import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Users</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let user of users">
            <span matListItemTitle>{{ user.name || user.email }}</span>
            <span matListItemLine>{{ user.email }}</span>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 1rem;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // We'll need to add this endpoint to get all users
    this.authService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Error fetching users:', error)
    });
  }
}