import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MockAuthService } from '../../core/services/mock-auth.service';

@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate {
  constructor(private authService: MockAuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role !== 'admin') {
      alert('Access denied. Admins only!');
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}