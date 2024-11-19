import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadColor'
})
export class EdadColorPipe implements PipeTransform {

    transform(clasificacionEdad: string) {

        switch(clasificacionEdad){
            case "A":
                return "color: #00920F";
            case "X":
                return "color: #8505A5;";
            case "+12":
                return "color: #00AC1A;";
            case "+15":
                return "color: #E1CB00";
            case "+16":
                return "color: #FF8000;";
            case "+18":
                return "color: #B70000;";
            case "N/A":
                return "color: #404040;";
            default:
                return "color: #E95573;";
        }
    }
}