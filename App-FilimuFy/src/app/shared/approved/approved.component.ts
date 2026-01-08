import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { AccountService } from '../../services/autenticacion/account.service';
import { Router } from '@angular/router'; // IMPORTANTE: Importamos el Router

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css'] // Corregido styleUrl a styleUrls (plural)
})
export class ApprovedComponent implements OnInit {

  gifEspera = "https://i.gifer.com/qa.gif";

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router // Inyectamos el Router aquí
  ) { }

  ngOnInit(): void {
    // Eliminamos el setTimeout artificial para que sea más rápido
    this.authService.createSession().subscribe({
      next: (response) => {
        // 1. Guardamos la Session ID
        localStorage.setItem('session_id', response.session_id);

        // 2. Pedimos los detalles de la cuenta
        this.accountService.getAccountDetails().subscribe((response) => {
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('user_photo', response.avatar.tmdb.avatar_path ?? '');
          localStorage.setItem('account_id', response.id.toString());
          localStorage.setItem('logged_in', 'true');

          // 3. REDIRECCIÓN DINÁMICA (Adiós localhost)
          // Usamos el router de Angular para ir a '/inicio'
          this.router.navigate(['/inicio']);
        });
      },
      error: (error) => {
        console.error('Error al crear la sesión:', error);
        // SI FALLA: No nos quedamos en bucle, volvemos al inicio
        this.router.navigate(['/']);
      }
    });
  }
}