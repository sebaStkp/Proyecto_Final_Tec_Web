import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent {
  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.http.post('http://localhost:3000/api/login', { email, password })
      .subscribe((response: any) => {
        if (response.success) {
          this.authService.loginAsClient();
          this.router.navigate(['/inicio']);
        } else {
          alert('Invalid credentials');
        }
      });
  }
}
