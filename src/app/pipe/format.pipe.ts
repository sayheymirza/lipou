import { Pipe, PipeTransform } from '@angular/core';
import { formatPrice } from '../functions/price';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  constructor() { }

  transform(value: any, type: string | number, ...args: any[]): string {
    switch (type) {
      case 'price':
        return formatPrice(value);
      default:
        return '';
    }
  }
}
