import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

    transform(status: string) {

        switch(status){
            case "Rumored":
                return "color: #75574C";
            case "Planned":
                return "color: #BBBBBB;";
            case "In Production":
                return "color: #ECAA00;";
            case "Post Production":
                return "color: #0099EC;";
            case "Released":
                return "color: #08BB61;";
            case "Canceled":
                return "color: #DE0E0E;";
            default:
                return "color: red;";
        }
    }
}