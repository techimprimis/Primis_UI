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
        path: 'admin',
        loadComponent: () =>
            import('./components/admin/admin').then((m) => m.AdminComponent),
    },
];
