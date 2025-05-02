import {Component, EventEmitter, inject, OnInit} from '@angular/core';
import {OrderFormComponent} from '../../components/order-form/order-form.component';
import {OrderService} from '../../services/order.service';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {OrderToSend, Order} from '../../interfaces/order';
import {Observable} from 'rxjs';
import {Product} from '../../interfaces/product';
import {Customer} from '../../interfaces/customer';
import {ProductService} from '../../services/product.service';
import {CustomerService} from '../../services/customer.service';
import {OrderProduct} from '../../interfaces/order-product';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [
    OrderFormComponent,
    RouterLink
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []
  finishedFirstLoading = false

  formCreationModeTitle = "Cadastrar novo pedido"
  formTitle = this.formCreationModeTitle
  editModeEmitter = new EventEmitter<OrderToSend>()

  orderService = inject(OrderService)
  alertService = inject(AlertService)
  productService = inject(ProductService)
  customerService = inject(CustomerService)

  products!: Product[]
  customers!: Customer[]

  ngOnInit() {
    this.orderService.getAll().subscribe((data) => {
      this.orders = data
      this.finishedFirstLoading = true
    })

    this.productService.getAll().subscribe((data) => this.products = data)
    this.customerService.getAll().subscribe((data) => this.customers = data)
  }

  addNew(order: Order) {
    this.orders.push(order)
  }

  setEditModeToId(orderId: number) {
    const order = this.orders.filter(p => p.id === orderId)[0]
    const orderToSend = this.orderService.getOrderToSendFromOrder(order)
    this.editModeEmitter.emit(orderToSend)
    this.formTitle = `Editar pedido #${order.id}`
  }

  edit(editedOrder: OrderToSend) {
    this.orders = this.orders.map((order: Order) => {
      if (order.id !== editedOrder.id) return order
      const productsInEditedOrder = editedOrder.products.map((product: OrderProduct) => product.id)

      this.products = this.products.map(product => {
        if (!(product.id in productsInEditedOrder)) return product

        const editedProduct =
          editedOrder.products.filter(editedProduct => editedProduct.id === product.id)[0]

        return {...product, quantity: editedProduct.quantity}
      })

      return this.orderService.getOrderAfterUpdate(
        order,
        this.customers.filter(c => c.id === editedOrder.customerId)[0],
        this.products.filter(product => product.id in productsInEditedOrder)
      )
    })
  }

  setCreationMode() {
    this.formTitle = this.formCreationModeTitle
  }

  delete(orderId: number) {
    this.orderService.delete(orderId).subscribe(
      {
        next: () => {
          this.alertService.success(`Pedido #${orderId} excluído com sucesso`)
          this.orders = this.orders.filter(c => c.id !== orderId)
        },
        error: (response: HttpErrorResponse) => this.alertService.error(response.message),
      }
    )
  }
}
