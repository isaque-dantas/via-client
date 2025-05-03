import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'decimalWithTwoDigits'
})
export class DecimalWithTwoDigitsPipe implements PipeTransform {
  digitsAfterComma = 2

  transform(value: unknown): unknown {
    try {
      let decimalString = parseFloat(value as string).toLocaleString('pt-BR')

      let quantityOfDigits: number
      if (decimalString.split(',').length === 1) {
        quantityOfDigits = 0
      } else {
        quantityOfDigits = decimalString.split(',')[1].length
      }

      if (quantityOfDigits > this.digitsAfterComma) quantityOfDigits = this.digitsAfterComma

      let endPad = quantityOfDigits == 0 ? "," : ""
      for (let i = 0; i < this.digitsAfterComma - quantityOfDigits; i++) {
        endPad += "0"
      }

      return decimalString + endPad
    } catch (e) {
      return null
    }
  }

}
