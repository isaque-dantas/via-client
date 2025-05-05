import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NavItem} from '../../interfaces/nav-item';
import {AuthService} from '../../services/auth.service';

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
  route = inject(ActivatedRoute)
  authService = inject(AuthService)
  userIsLogged!: boolean

  possibleActionButtons: { nonLogged: NavItem[], logged: NavItem[] } = {
    nonLogged: [
      {label: 'Login', link: '/login'},
      {label: 'Fazer cadastro', link: '/fazer-cadastro'},
    ],
    logged: [
      {label: 'Ver perfil', link: '/funcionario'},
    ],
  }

  possibleNavItems: { nonLogged: NavItem[], logged: NavItem[] } = {
    nonLogged: [{label: 'Início', link: '/inicio'}],
    logged: [
      {label: 'Início', link: '/inicio'},
      {label: 'Pedidos', link: '/pedidos'},
      {label: 'Clientes', link: '/clientes'},
      {label: 'Produtos', link: '/produtos'},
      {label: 'Relatórios', link: '/relatorios'},
    ],
  }

  get navItems(): NavItem[] {
    return this.userIsLogged ? this.possibleNavItems.logged : this.possibleNavItems.nonLogged
  }

  get actionButtons(): NavItem[] {
    return this.userIsLogged ? this.possibleActionButtons.logged : this.possibleActionButtons.nonLogged
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      if (data.length < 1) return;
      const currentPath = data[0].path

      this.possibleNavItems.nonLogged = this.possibleNavItems.nonLogged.map(item => {
        return {...item, isActive: item.link.replace('/', '') === currentPath}
      })

      this.possibleNavItems.logged = this.possibleNavItems.logged.map(item => {
        return {...item, isActive: item.link.replace('/', '') === currentPath}
      })
    })

    this.authService.authStatusChanged.subscribe(() => this.userIsLogged = this.authService.isAuthenticated())
    this.userIsLogged = this.authService.isAuthenticated()
  }
}
