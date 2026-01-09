import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarFotoPipe implements PipeTransform {

  transform(avatar: string | null | undefined): string {
   let url: string = 'https://image.tmdb.org/t/p/original/';
   let userPhotoMono: string = 'https://media.istockphoto.com/id/824860820/es/foto/macaco-barbary.jpg?s=612x612&w=0&k=20&c=ZpSUFg0ZZtnVUVMo_k1wB5gO-7sXqrwoa29O-e5EM1o=';

   // Verificar si no hay avatar (null, undefined, cadena vacía o 'null' como string)
   if (!avatar || avatar === 'null' || avatar.trim() === '') {
    return userPhotoMono;
   } else {
    return url + avatar;
   }
  }

}
