import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from "../../components/header/header.component";

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

}
