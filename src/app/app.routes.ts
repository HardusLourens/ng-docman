import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'files', component: FileManagerComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
