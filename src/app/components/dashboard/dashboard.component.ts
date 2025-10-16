import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../auth/auth.service';
import { FileManagerComponent } from "../file-manager/file-manager.component";
import { UserListComponent } from '../user-list/user-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: 
  [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    FileManagerComponent,
    UserListComponent
  ],
  template: `
     <div class="dashboard-container">
      <h2>Dashboard</h2>
      
      <mat-tab-group>
        <mat-tab label="My Files">
          <app-file-manager></app-file-manager>
        </mat-tab>
        
        <mat-tab label="All Files">
          <app-file-manager [showAllFiles]="true"></app-file-manager>
        </mat-tab>
        
        <mat-tab label="Users">
          <app-user-list></app-user-list>
        </mat-tab>
      </mat-tab-group>

      <button mat-raised-button color="primary" (click)="logout()" class="logout-button">
        Logout
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      margin-bottom: 2rem;
    }

    .logout-button {
      margin-top: 2rem;
    }
  `]
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}