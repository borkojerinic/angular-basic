import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe implements PipeTransform {
    transform(value: string) {
        let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        let newDate = new Date(value.replace(pattern, '$3-$2-$1'));
        let datePipe = new DatePipe("en-US");
        return datePipe.transform(newDate, 'dd/MMM/yyyy');
    }
}