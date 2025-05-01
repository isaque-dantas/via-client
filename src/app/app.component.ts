import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {AlertsContainerComponent} from './components/alerts-container/alerts-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AlertsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'processo-seletivo-logap2025-client';
}
