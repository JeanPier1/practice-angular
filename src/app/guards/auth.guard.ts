import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private service: UsuarioService, private route: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.validarToken().pipe(
      tap((estado) => {
        if (!estado) {
          this.route.navigateByUrl('/login');
        }
      })
    );
  }
}
