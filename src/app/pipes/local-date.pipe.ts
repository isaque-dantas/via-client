import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: string): unknown {
    const splitValue = value.split('-')

    const year = splitValue[0]
    const month = splitValue[1]
    const day = splitValue[2]

    return `${day}/${month}/${year}`
  }

}
