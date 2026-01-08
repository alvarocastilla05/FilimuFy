import { Component, OnInit, NgZone } from '@angular/core'; // <--- 1. Importamos NgZone
import { AuthService } from '../../services/autenticacion/auth.service';
import { AccountService } from '../../services/autenticacion/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  // Si tienes una variable para el gif, asegúrate de que coincida con tu HTML
  gifEspera = "https://i.gifer.com/qa.gif"; 

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private ngZone: NgZone // <--- 2. Inyectamos NgZone aquí
  ) { }

  ngOnInit(): void {
    // Llamamos a crear sesión
    this.authService.createSession().subscribe({
      next: (response) => {
        // Guardamos el Session ID
        localStorage.setItem('session_id', response.session_id);

        // Pedimos los datos de la cuenta
        this.accountService.getAccountDetails().subscribe((response) => {
          // Guardamos datos del usuario
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('user_photo', response.avatar.tmdb.avatar_path ?? '');
          localStorage.setItem('account_id', response.id.toString());
          localStorage.setItem('logged_in', 'true');

          // --- AQUÍ ESTÁ EL ARREGLO ---
          // Usamos ngZone.run() para obligar a Angular a navegar y quitar el spinner
          this.ngZone.run(() => {
            this.router.navigate(['/inicio']);
          });
          // ----------------------------
        });
      },
      error: (error) => {
        console.error('Error al crear la sesión:', error);
        // Si falla, también volvemos al inicio forzando la zona
        this.ngZone.run(() => {
          this.router.navigate(['/']); 
        });
      }
    });
  }
}