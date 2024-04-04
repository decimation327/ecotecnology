import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Si el usuario no ha iniciado sesión, muestra un mensaje de error y redirige a la página de inicio de sesión
      Swal.fire('Error', 'Por favor, inicia sesión para acceder a esta página', 'error');
      this.router.navigate(['/home']); // Redirige a la página de inicio de seión
      return false;
    }
  } 
}
