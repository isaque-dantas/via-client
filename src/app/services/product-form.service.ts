import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {
  fb = inject(FormBuilder)
  maxIntegerValue = 999999999

  productGroupFactory() {
    return this.fb.group({
      id: new FormControl<number | null>(null, Validators.required),
      quantity: [1, [Validators.min(1), Validators.max(this.maxIntegerValue), Validators.required]],
    })
  }
}
