import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VowelReaderService} from '../../services/vowel-reader.service';
import {VowelReadingResult} from '../../interfaces/vowel-reading-result';
import {JsonPrinterPipe} from '../../pipes/json-printer.pipe';

@Component({
  selector: 'app-vowel-reader',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    JsonPrinterPipe
  ],
  templateUrl: './vowel-reader.component.html',
  styleUrl: './vowel-reader.component.css'
})
export class VowelReaderComponent {
  inputStringControl = new FormControl<string>(' aAbBABacafe')
  vowelReaderService = inject(VowelReaderService)

  result?: VowelReadingResult

  onSubmit() {
    this.vowelReaderService
      .post(this.inputStringControl.value)
      .subscribe(data => this.result = data)
  }

  getKeyValueFromObject(obj: any) {
    return Object.entries(obj).map(o => {
      return {key: o[0], value: o[1]}
    })
  }
}
