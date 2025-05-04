import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CustomerListComponent} from './pages/customer-list/customer-list.component';
import {OrderListComponent} from './pages/order-list/order-list.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {loggedOnlyGuard} from './auth/logged-only.guard';
import {CustomerDetailComponent} from './pages/customer-detail/customer-detail.component';
import {ReportsComponent} from './pages/reports/reports.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'employee', component: ProfileComponent, canActivate: [loggedOnlyGuard]},
  {path: 'employee/:email', component: ProfileComponent, canActivate: [loggedOnlyGuard]},
  {path: 'products', component: ProductListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'product/:id', component: ProductListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'customers', component: CustomerListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'customer/:id', component: CustomerDetailComponent, canActivate: [loggedOnlyGuard]},
  {path: 'orders', component: OrderListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'order/:id', component: OrderDetailComponent, canActivate: [loggedOnlyGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [loggedOnlyGuard]},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
