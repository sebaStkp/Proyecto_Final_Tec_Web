// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminUser: boolean = false;

  constructor() {}

  loginAsAdmin() {
    this.isAdminUser = true;
  }

  loginAsClient() {
    this.isAdminUser = false;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }
}
