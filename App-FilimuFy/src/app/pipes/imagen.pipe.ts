import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): String {
   let url: string = 'https://image.tmdb.org/t/p/original/';

    return url + img;
  }

}
