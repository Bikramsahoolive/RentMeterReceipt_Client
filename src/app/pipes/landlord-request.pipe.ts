import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'landlordRequest'
})
export class LandlordRequestPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;
    return value.filter((item:any)=> item.status==args);
  }

}
