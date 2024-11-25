import { Component } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css'
})
export class ScreenComponent {

  nombre: string | undefined;

  onSearchClicked1(nombre: string) {
    return this.nombre = nombre;
  }
}
