import { Routes } from '@angular/router';
import { ERoutes } from './shared/enums/routes.enum';
import { authGuard } from './core/guards/auth-guard';
import { LoginLayout } from './layouts/login-layout/login-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: ERoutes.LOGIN,
    component: LoginLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
      },
    ],
  },
  {
    path: ERoutes.HOME,
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: ERoutes.HOME,
  },
];
