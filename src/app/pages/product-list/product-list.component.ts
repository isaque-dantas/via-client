import {Component, EventEmitter, inject, OnInit} from '@angular/core';
import {ProductFormComponent} from '../../components/product-form/product-form.component';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {HeaderComponent} from '../../components/header/header.component';
import {RouterLink} from '@angular/router';
import {DecimalWithTwoDigitsPipe} from '../../pipes/decimal-with-two-digits.pipe';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductFormComponent,
    HeaderComponent,
    RouterLink,
    DecimalWithTwoDigitsPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  finishedFirstLoading = false

  formCreationModeTitle = "Cadastrar novo produto"
  formTitle = this.formCreationModeTitle
  editModeEmitter = new EventEmitter<Product>()

  productService = inject(ProductService)
  alertService = inject(AlertService)

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data
      this.finishedFirstLoading = true
    })
  }

  addNew(product: Product) {
    this.products.push(product)
  }

  setEditModeToId(productId: number) {
    const product = this.products.filter(p => p.id === productId)[0]
    this.editModeEmitter.emit(product)
    this.formTitle = `Editar produto #${product.id}`
  }

  edit(editedProduct: Product) {
    this.products = this.products.map((p: Product) => {
      if (p.id !== editedProduct.id) return p
      return editedProduct
    })
  }

  setCreationMode() {
    this.formTitle = this.formCreationModeTitle
  }

  delete(productId: number) {
    this.productService.delete(productId).subscribe(
      {
        next: () => {
          this.alertService.success(`Produto #${productId} excluído com sucesso`)
          this.products = this.products.filter(c => c.id !== productId)
        },
        error: (response: HttpErrorResponse) => this.alertService.error(response.message),
      }
    )
  }
}
