import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NavItem} from '../../interfaces/nav-item';
import {AuthService} from '../../services/auth.service';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../interfaces/employee';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService)
  employeeService = inject(EmployeeService)
  userIsLogged!: boolean

  possibleActionButtons: { nonLogged: NavItem[], logged: NavItem[] } = {
    nonLogged: [
      {label: 'Login', link: '/login'},
      {label: 'Fazer cadastro', link: '/register'},
    ],
    logged: [
      {label: 'Ver perfil', link: '/employee'},
    ],
  }
  actionButtons!: NavItem[]

  possibleNavItems: { nonLogged: NavItem[], logged: NavItem[] } = {
    nonLogged: [{label: 'Início', link: '/home'}],
    logged: [
      {label: 'Início', link: '/home'},
      {label: 'Pedidos', link: '/orders'},
      {label: 'Clientes', link: '/customers'},
      {label: 'Produtos', link: '/products'},
      {label: 'Relatórios', link: '/reports'},
    ],
  }

  navItems!: NavItem[]

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(() => {
      this.setLinksBasedOnAuthStatus()
      this.userIsLogged = this.authService.isAuthenticated()
    })

    this.setLinksBasedOnAuthStatus()
    this.userIsLogged = this.authService.isAuthenticated()
  }

  setLinksBasedOnAuthStatus() {
    if (this.authService.isAuthenticated()) {
      this.navItems = this.possibleNavItems.logged
      this.actionButtons = this.possibleActionButtons.logged
      this.setLinkForLoggedEmployee()

      return;
    }

    this.navItems = this.possibleNavItems.nonLogged
    this.actionButtons = this.possibleActionButtons.nonLogged
  }

  setLinkForLoggedEmployee() {
    return this.employeeService.getLogged().subscribe((data: Employee) => {
      this.possibleActionButtons.logged[0].link = `/employee/${data.email}`
    })
  }
}
