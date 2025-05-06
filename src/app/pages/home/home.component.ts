import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from "../../components/header/header.component";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
    imports: [
        NgOptimizedImage,
        RouterLink,
        HeaderComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService)

}
