import { Component } from '@angular/core';
import { AuthService } from '../../services/autenticacion/auth.service';
import { AccountService } from '../../services/autenticacion/account.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css'
})
export class ApprovedComponent {

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.createSession().subscribe((response) => {
      localStorage.setItem('session_id', response.session_id);
      this.accountService.getAccountDetails().subscribe((response) => {
        localStorage.setItem('user_name', response.name);
        localStorage.setItem('user_photo', response.avatar.tmdb.avatar_path);
        localStorage.setItem('logged_in', 'true');

        window.location.href = 'http://localhost:4200/inicio';
      });
    });
  }
}
