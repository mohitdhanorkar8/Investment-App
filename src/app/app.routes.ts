import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./component/login/login').then(m => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./component/register/register').then(m => m.RegisterComponent), 
    },
    {
        path: 'find-my-investment',
        loadComponent: () => import('./find-my-investment/find-my-investment').then(m => m.FindMyInvestment)
    },
    {
        path: 'investment-list',
        loadComponent: () => import('./component/investment-list/investment-list').then(m => m.InvestmentList)
    },
    {
        path: 'add-investment',
        loadComponent: () => import('./component/add-investment/add-investment').then(m => m.AddInvestment)
    },
    {
        path: 'update-investment/:id',
        loadComponent: () => import('./component/add-investment/add-investment').then(m => m.AddInvestment)
    },
    {
        path: 'add-investment-reactive',
        loadComponent: () => import('./component/add-investment-reactive/add-investment-reactive').then(m => m.AddInvestmentReactive)
    },
    {
        path: 'investment-signal-store',
        loadComponent: () => import('./component/investement-dashboard/investement-dashboard').then(m => m.InvestementDashboard)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
