import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/guards/auth.guard';
import { RoleGuard } from './components/guards/role.guard';

export const routes: Routes = [
  // lazy load auth routes
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Dashboard - protected by AuthGuard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  // Admin - protected by AuthGuard + RoleGuard
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard]
  },

  // Default redirect
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Wildcard redirect to login
  { path: '**', redirectTo: 'auth/login' }
];
