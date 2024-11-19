import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSeriesColor'
})
export class StatusSeriesColorPipe implements PipeTransform {

    transform(status: string) {

        switch(status){
            case "Returning Series":
                return "color: #08BB61";
            case "Pilot":
                return "color: #AE00D1;";
            case "In Production":
                return "color: #ECAA00;";
            case "Planned":
                return "color: #BBBBBB;";
            case "Post Production":
                return "color: #0099EC;";
            case "Ended":
                return "color: #BA0202;";
            case "Canceled":
                return "color: #DE0E0E;";
            default:
                return "color: red;";
        }
    }
}