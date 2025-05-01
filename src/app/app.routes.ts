import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CustomerListComponent} from './pages/customer-list/customer-list.component';
import {OrderListComponent} from './pages/order-list/order-list.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {loggedOnlyGuard} from './auth/logged-only.guard';

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [loggedOnlyGuard]},

  {path: 'dashboard', component: DashboardComponent, canActivate: [loggedOnlyGuard]},
  {path: 'customers', component: CustomerListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'products', component: ProductListComponent, canActivate: [loggedOnlyGuard]},

  {path: 'orders', component: OrderListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'order/:id', component: OrderDetailComponent, canActivate: [loggedOnlyGuard]},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: DashboardComponent},
];
