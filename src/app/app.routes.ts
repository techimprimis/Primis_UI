import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login').then((m) => m.LoginComponent),
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('./components/forgot-password/forgot-password').then((m) => m.ForgotPasswordComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./components/reset-password/reset-password').then((m) => m.ResetPasswordComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./components/dashboard/dashboard').then((m) => m.DashboardComponent),
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./components/admin/admin').then((m) => m.AdminComponent),
    },
];
