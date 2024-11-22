import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion/auth.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {

  constructor(private router: Router, private authService: AuthService) { }

  // HEADER 
  logoFilimuFy = 'https://cdn-icons-png.flaticon.com/512/4221/4221360.png';
  rutaActual: string = "";
  userName = '';
  userPhoto = '';
  userPhotoMono = 'https://media.istockphoto.com/id/824860820/es/foto/macaco-barbary.jpg?s=612x612&w=0&k=20&c=ZpSUFg0ZZtnVUVMo_k1wB5gO-7sXqrwoa29O-e5EM1o=';

  ngOnInit(): void {
    this.rutaActual = this.router.url;
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo') ? 
      `https://image.tmdb.org/t/p/original${localStorage.getItem('user_photo')}`: '';
  }

  getRutaSeleccionada(pagina: string) {
    let rutaActual = this.router.url;

    if(rutaActual.includes(pagina)) {
      return true;
    } else {
      return false;
    }
  }


  // AUTENTICACIÓN -----------------------------------------------------------------------------------

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/approved`;
    });
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

}