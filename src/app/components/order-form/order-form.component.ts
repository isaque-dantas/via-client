import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {AlertService} from '../../services/alert.service';
import {Order} from '../../interfaces/order';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  fb = inject(FormBuilder)
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    price: [0, [Validators.required, Validators.max(9999999999.99)]],
    description: ['', [Validators.maxLength(256)]],
  })

  orderService = inject(OrderService)
  alertService = inject(AlertService)

  @Output() newOrderAdded = new EventEmitter<Order>()
  @Output() orderEdited = new EventEmitter<Order>()
  @Output() creationModeSet = new EventEmitter<void>()

  @Input() editModeEmitter!: EventEmitter<Order>

  orderBeingEdited!: Order | null
  mode: "create" | "edit" = "create"

  ngOnInit() {
    this.editModeEmitter!.subscribe((order) => {
      this.orderBeingEdited = order
      this.mode = "edit"

      // this.form.setValue({
      //   name: order.name,
      //   price: order.price,
      //   description: order.description ?? null
      // })
    })
  }

  onSubmit() {
    console.log(this.form.controls.price.errors)
    if (this.form.invalid) {
      this.alertService.error("Os dados do produto são inválidos.")
      return;
    }

    if (this.mode === "create") this.create()
    if (this.mode === "edit") this.edit()
  }

  create() {
    this.orderService.create(this.form.value as Order).subscribe({
      next: (order: Order) => {
        this.alertService.success(`O produto '${order.id}' foi criado com sucesso.`)
        this.newOrderAdded.emit(order)
        this.form.reset()
      },
      error: (response: HttpErrorResponse) => this.alertService.error(response.message),
    })
  }

  edit() {
    this.orderService.edit(this.orderBeingEdited!.id, this.form.value as Order).subscribe({
      next: () => {
        const editedOrder = {...this.form.value, id: this.orderBeingEdited!.id} as Order

        this.alertService.success(`O produto '${editedOrder.id}' foi editado com sucesso.`)
        this.orderEdited.emit(editedOrder)

        this.setCreationMode()
      },
      error: (response: HttpErrorResponse) => this.alertService.error(response.message),
    })
  }

  setCreationMode() {
    this.mode = "create"
    this.form.reset()
    this.creationModeSet.emit()
  }
}
