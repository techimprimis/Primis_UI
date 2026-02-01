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
        path: 'email-login',
        loadComponent: () =>
            import('./components/email-login/email-login').then((m) => m.EmailLoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./components/signup/signup').then((m) => m.SignupComponent),
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
        path: 'preferences',
        loadComponent: () =>
            import('./components/preferences/preferences').then((m) => m.PreferencesComponent),
    },
];
