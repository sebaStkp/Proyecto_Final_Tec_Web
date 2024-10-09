import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-administrador',
  standalone: true,
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent {
  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  loginAdmin() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.http.post('http://localhost:3000/api/loginAdministrador', { email, password })
      .subscribe((response: any) => {
        if (response.success) {
          this.authService.loginAsAdmin();
          this.router.navigate(['/inicio']);
        } else {
          alert('Invalid credentials');
        }
      });
  }

}
