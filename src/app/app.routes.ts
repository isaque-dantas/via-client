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
import {ProductDetailComponent} from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'fazer-cadastro', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'funcionario', component: ProfileComponent, canActivate: [loggedOnlyGuard]},
  {path: 'funcionario/:email', component: ProfileComponent, canActivate: [loggedOnlyGuard]},
  {path: 'produtos', component: ProductListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'produto/:id', component: ProductDetailComponent, canActivate: [loggedOnlyGuard]},
  {path: 'clientes', component: CustomerListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'cliente/:id', component: CustomerDetailComponent, canActivate: [loggedOnlyGuard]},
  {path: 'pedidos', component: OrderListComponent, canActivate: [loggedOnlyGuard]},
  {path: 'pedido/:id', component: OrderDetailComponent, canActivate: [loggedOnlyGuard]},
  {path: 'relatorios', component: ReportsComponent, canActivate: [loggedOnlyGuard]},

  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];
