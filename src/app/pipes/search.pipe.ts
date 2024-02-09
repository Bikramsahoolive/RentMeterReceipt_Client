import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)return value;
    if(!value)return null;
    args = args.toLowerCase();
    return value.filter((item:any)=> JSON.stringify(item).toLowerCase().includes(args));
  }

}
