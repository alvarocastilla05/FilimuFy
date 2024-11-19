import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {

  constructor(private router: Router ) { }

  // HEADER 
  logoFilimuFy = 'https://cdn-icons-png.flaticon.com/512/4221/4221360.png';
  
  rutaActual: string = "";

  ngOnInit(): void {
    this.rutaActual = this.router.url;
  }

  getRutaSeleccionada() {
    let rutaActual = this.router.url;

    if(rutaActual.includes('peliculas')) {

    }
  }

}
