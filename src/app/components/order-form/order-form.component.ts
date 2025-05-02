import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {AlertService} from '../../services/alert.service';
import {OrderToSend, Order} from '../../interfaces/order';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interfaces/product';
import {Customer} from '../../interfaces/customer';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  orderService = inject(OrderService)
  alertService = inject(AlertService)
  productService = inject(ProductService)

  fb = inject(FormBuilder)
  form = this.fb.group(
    {
      customer: [null, [Validators.required]],
      products: this.fb.array(
        [
          this.productService.productGroupFactory()
        ], [Validators.min(1), this.orderService.uniqueProductIdValidator]
      ),
      date: ['', [Validators.required, this.orderService.dateNotPastThanTodayValidator]],
      description: ['', [Validators.maxLength(256)]],
    },
    // {
    //   validators: [
    //     this.orderService.datePastThanValidator('startDate', 'endDate'),
    //     this.orderService.datePastThanValidator('subscriptionsOpening', 'subscriptionsClosing')
    //   ]
    // }
  )

  @Output() newOrderAdded = new EventEmitter<Order>()
  @Output() orderEdited = new EventEmitter<OrderToSend>()
  @Output() creationModeSet = new EventEmitter<void>()

  @Input() editModeEmitter!: EventEmitter<OrderToSend>
  @Input() products!: Product[]
  @Input() customers!: Customer[]

  orderBeingEdited!: OrderToSend | null
  mode: "create" | "edit" = "create"
  alreadyClickedSubmitButton: boolean = false

  get productsArray() {
    return this.form.get('products') as FormArray
  }

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

    this.form.valueChanges.subscribe((value) => {
      console.log(this.productsArray.errors)
    })
  }

  onSubmit() {
    console.log(this.form.value)
    console.log(this.form.controls.customer.errors)
    console.log(this.form.controls.date.errors)
    console.log('---')
    this.alreadyClickedSubmitButton = true

    if (this.form.invalid) {
      this.alertService.error("Os dados do pedido são inválidos.")
      return;
    }

    // const orderToSend = this.removeEmptyProducts()

    if (this.mode === "create") this.create()
    if (this.mode === "edit") this.edit()
  }

  create() {
    this.orderService.create(this.form.value as OrderToSend).subscribe({
      next: (order: Order) => {
        this.alertService.success(`O pedido '${order.id}' foi criado com sucesso.`)
        this.newOrderAdded.emit(order)
        this.resetForm()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  edit() {
    this.orderService.edit(this.orderBeingEdited!.id, this.form.value as OrderToSend).subscribe({
      next: () => {
        const editedOrder = {...this.form.value, id: this.orderBeingEdited!.id} as OrderToSend

        this.alertService.success(`O pedido '${editedOrder.id}' foi editado com sucesso.`)
        this.orderEdited.emit(editedOrder)

        this.setCreationMode()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  handleError(response: HttpErrorResponse) {
    if ('non_field_errors' in response.error) {
      for (let error of response.error['non_field_errors']) {
        this.alertService.error(error)
      }
      return;
    }

    this.alertService.error(response.message)
  }

  resetForm() {
    this.form.reset()
    this.productsArray.clear()
    this.productsArray.push(this.productService.productGroupFactory())
    this.alreadyClickedSubmitButton = false
  }

  setCreationMode() {
    this.mode = "create"
    this.resetForm()
    this.creationModeSet.emit()
  }

  removeProduct(index: number) {
    this.productsArray.removeAt(index)
  }

  addProduct() {
    this.productsArray.push(this.productService.productGroupFactory())
  }

  getProductsNamesByIds(productsIds: number[]) {
    const names =
      productsIds
        .map(id => {
          return '"' + this.products.filter(p => p.id === id)[0].name + '"'
        })

    return names.join(', ')
  }
}
