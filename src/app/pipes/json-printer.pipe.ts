import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPrinter'
})
export class JsonPrinterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return JSON.stringify(value, null, ' ');
  }

}
