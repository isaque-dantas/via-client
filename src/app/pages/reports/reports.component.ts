import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {Observable} from 'rxjs';
import {Reports} from '../../interfaces/reports';
import {ReportsService} from '../../services/reports.service';
import {AsyncPipe} from '@angular/common';
import {LocalDatePipe} from '../../pipes/local-date.pipe';
import {Product} from '../../interfaces/product';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-reports',
  imports: [
    HeaderComponent,
    AsyncPipe,
    LocalDatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  reports$!: Observable<Reports>
  reportsService = inject(ReportsService)

  form = new FormGroup({
    shouldFilterReports: new FormControl<boolean>(false),
    selectedReport: new FormControl<string>({value: '', disabled: true}),
  })

  ngOnInit() {
    this.reports$ = this.reportsService.get()

    this.form.controls.shouldFilterReports.valueChanges.subscribe((value) => {
      if (value) this.form.controls.selectedReport.enable()
      if (!value) this.form.controls.selectedReport.disable()
    })

    this.form.valueChanges.subscribe(value => {
      // console.log(value.shouldFilterReports)
    })
  }

  joinProductsNames(products: Product[]) {
    return products.map(p => '"' + p.name + '"').join(', ')
  }
}
