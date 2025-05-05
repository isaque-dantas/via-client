import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {AlertService} from '../../services/alert.service';
import {Product} from '../../interfaces/product';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  fb = inject(FormBuilder)
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    price: [0, [Validators.required, Validators.max(99999999.99)]],
    description: ['', [Validators.maxLength(256)]],
  })

  productService = inject(ProductService)
  alertService = inject(AlertService)

  @Output() newProductAdded = new EventEmitter<Product>()
  @Output() productEdited = new EventEmitter<Product>()
  @Output() creationModeSet = new EventEmitter<void>()

  @Input() editModeEmitter!: EventEmitter<Product>

  productBeingEdited!: Product | null
  mode: "create" | "edit" = "create"

  ngOnInit() {
    this.editModeEmitter!.subscribe((product) => {
      this.productBeingEdited = product
      this.mode = "edit"

      this.form.setValue({
        name: product.name,
        price: product.price,
        description: product.description ?? null
      })
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
    this.productService.create(this.form.value as Product).subscribe({
      next: (product: Product) => {
        this.alertService.success(`O produto '${product.name}' foi criado com sucesso.`)
        this.newProductAdded.emit(product)
        this.form.reset()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  edit() {
    this.productService.edit(this.productBeingEdited!.id, this.form.value as Product).subscribe({
      next: () => {
        const editedProduct = {...this.form.value, id: this.productBeingEdited!.id} as Product

        this.alertService.success(`O produto '${editedProduct.name}' foi editado com sucesso.`)
        this.productEdited.emit(editedProduct)

        this.setCreationMode()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  handleError(response: HttpErrorResponse) {
    if (!('non_field_errors' in response.error)) {
      this.alertService.error(response.message)
      return;
    }
    console.log(response.error)
    console.log(response.error.non_field_errors)
    for (let error of response.error.non_field_errors) {
      this.alertService.error(error)
    }
  }

  setCreationMode() {
    this.mode = "create"
    this.form.reset()
    this.creationModeSet.emit()
  }
}
