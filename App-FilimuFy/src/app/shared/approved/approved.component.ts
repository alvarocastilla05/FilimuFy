import { Component } from '@angular/core';
import { AccountService } from '../../services/autenticacion/account.service';
import { AuthService } from '../../services/autenticacion/auth.service';
import { AvatarFotoPipe } from '../../pipes/avatarFoto.pipe';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent {

  gifEspera = 'https://i.gifer.com/qG.gif';

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.createSession().subscribe((response) => {
        localStorage.setItem('session_id', response.session_id);
        this.accountService.getAccountDetails().subscribe((response) => {
          localStorage.setItem('user_name', response.username);
          localStorage.setItem('user_photo', response.avatar.tmdb.avatar_path);
          localStorage.setItem('account_id', response.id.toString());
          localStorage.setItem('logged_in', 'true');

          window.location.href = 'http://localhost:4200/inicio';
        });
      });
    }, 1800);
  }
}