import {Component, EventEmitter, inject, Output, Input, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../interfaces/customer';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  fb = inject(FormBuilder)
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
  })

  customerService = inject(CustomerService)
  alertService = inject(AlertService)

  @Output() newCustomerAdded = new EventEmitter<Customer>()
  @Output() customerEdited = new EventEmitter<Customer>()
  @Output() creationModeSet = new EventEmitter<void>()

  @Input() editModeEmitter!: EventEmitter<Customer>
  customerBeingEdited!: Customer | null
  mode: "create" | "edit" = "create"

  ngOnInit() {
    this.editModeEmitter!.subscribe((customer) => {
      this.customerBeingEdited = customer
      this.mode = "edit"

      this.form.setValue({name: customer.name, email: customer.email})
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.error("Os dados do cliente são inválidos.")
      return;
    }

    if (this.mode === "create") this.create()
    if (this.mode === "edit") this.edit()
  }

  create() {
    this.customerService.create(this.form.value as Customer).subscribe({
      next: (customer: Customer) => {
        this.alertService.success(`O cliente '${customer.name}' foi criado com sucesso.`)
        this.newCustomerAdded.emit(customer)
        this.form.reset()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  edit() {
    this.customerService.edit(this.customerBeingEdited!.id, this.form.value as Customer).subscribe({
      next: () => {
        const editedCustomer = {...this.form.value, id: this.customerBeingEdited!.id} as Customer

        this.alertService.success(`O cliente '${editedCustomer.name}' foi editado com sucesso.`)
        this.customerEdited.emit(editedCustomer)

        this.setCreationMode()
      },
      error: (response: HttpErrorResponse) => this.handleError(response),
    })
  }

  handleError(response: HttpErrorResponse) {
    if (response.error.email !== undefined && response.error.email[0] === "Enter a valid email address.") {
      this.alertService.error('Insira um e-mail válido.')
      return;
    }

    if (response.error.email !== undefined && response.error.email[0] === "customer with this email already exists.") {
      this.alertService.error('Esse e-mail já foi cadastrado.')
      return;
    }

    this.alertService.error(response.message)
  }

  setCreationMode() {
    this.mode = "create"
    this.form.reset()
    this.creationModeSet.emit()
  }
}
