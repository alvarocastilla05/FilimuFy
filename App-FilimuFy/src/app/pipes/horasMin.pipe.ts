import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasMin'
})
export class HorasMinPipe implements PipeTransform {

    transform(numero: number): string{
        let horasSinMinutos;
        let minutosRestantes;

        horasSinMinutos = Math.trunc(numero/60);
        minutosRestantes = numero-(60*horasSinMinutos);

        if(numero < 60){
            return numero+"min";
        }else{
            if(minutosRestantes == 0){
                return horasSinMinutos+"h";
            }else{
                return horasSinMinutos+"h "+minutosRestantes+"min";
            }
        }
    }

}
