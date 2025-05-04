import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlertsContainerComponent} from './components/alerts-container/alerts-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'processo-seletivo-logap2025-client';
}
