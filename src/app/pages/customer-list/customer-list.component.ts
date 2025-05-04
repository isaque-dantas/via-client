import {Component, EventEmitter, inject, OnInit} from '@angular/core';
import {Customer} from '../../interfaces/customer';
import {CustomerService} from '../../services/customer.service';
import {CustomerFormComponent} from '../../components/customer-form/customer-form.component';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [CustomerFormComponent, ReactiveFormsModule, HeaderComponent, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  finishedFirstLoading = false
  customers: Customer[] = []

  customerService = inject(CustomerService)
  alertService = inject(AlertService)

  editModeEmitter = new EventEmitter<Customer>()

  formCreationModeTitle = "Cadastrar novo cliente"
  formTitle: string = this.formCreationModeTitle

  ngOnInit() {
    this.customerService.getAll().subscribe((data) => {
      this.customers = data
      this.finishedFirstLoading = true
    })
  }

  addNew(customer: Customer) {
    this.customers.push(customer)
  }

  setEditModeToId(customerId: number) {
    const customer = this.customers.filter(c => c.id === customerId)[0]
    this.editModeEmitter.emit(customer)
    this.formTitle = `Editar cliente #${customer.id}`
  }

  edit(editedCustomer: Customer) {
    this.customers = this.customers.map((c: Customer) => {
      if (c.id !== editedCustomer.id) return c
      return editedCustomer
    })
  }

  setCreationMode() {
    this.formTitle = this.formCreationModeTitle
  }

  delete(customerId: number) {
    this.customerService.delete(customerId).subscribe(
      {
        next: () => {
          this.alertService.success(`Cliente #${customerId} excluído com sucesso`)
          this.customers = this.customers.filter(c => c.id !== customerId)
        },
        error: (response: HttpErrorResponse) => this.alertService.error(response.message),
      }
    )
  }
}
