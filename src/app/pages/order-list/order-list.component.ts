import { Component } from '@angular/core';
import {OrderFormComponent} from '../../components/order-form/order-form.component';

@Component({
  selector: 'app-order-list',
  imports: [
    OrderFormComponent
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

}
