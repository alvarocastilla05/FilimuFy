import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageColor'
})
export class AverageColorPipe implements PipeTransform {

    transform(numero: number): string{

        if(numero == 10){
            return "background-color: #000A1E !important; border-bottom: 4px solid #20B7E5;"
        }else{
            if(numero >= 7){
                return "background-color: #000A1E !important; border-bottom: 4px solid #01D216;"
            }else{
                if(numero >= 5 && numero < 7){
                    return "background-color: #000A1E !important; border-bottom: 4px solid rgb(255, 193, 7);"
                }else{
                    if(numero >= 2.5 && numero < 5 ){
                        return "background-color: #000A1E !important; border-bottom: 4px solid rgb(255, 115, 0);"
                    }else{
                        return "background-color: #000A1E !important; border-bottom: 4px solid #FF0000;"
                    }
                }
            }
        }
    }
}
