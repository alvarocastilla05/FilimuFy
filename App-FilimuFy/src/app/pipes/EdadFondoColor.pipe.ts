import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadFondoColor'
})
export class EdadFondoColorPipe implements PipeTransform {

    transform(clasificacionEdad: string) {

        switch(clasificacionEdad){
            case "A":
                return "background-color: #00920F";
            case "X":
                return "background-color: #8505A5;";
            case "+12":
                return "background-color: #00AC1A;";
            case "+15":
                return "background-color: #E1CB00";
            case "+16":
                return "background-color: #FF8000;";
            case "+18":
                return "background-color: #B70000;";
            case "N/A":
                return "background-color: #404040;";
            default:
                return "background-color: #E95573;";
        }
    }
}