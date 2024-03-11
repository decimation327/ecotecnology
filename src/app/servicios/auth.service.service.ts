import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  logout(): void {
    if (this.getToken()) {
      localStorage.removeItem(this.tokenKey); // Elimina el token del almacenamiento local al cerrar sesión
    } else {
      // Muestra un mensaje de error si el usuario no ha iniciado sesión
      Swal.fire('Error', 'No se ha iniciado sesión', 'error');
    }
  }

  isAuthenticated(): boolean {
    // Verifica si el token existe en el almacenamiento local
    return !!this.getToken();
  }

  getUserType(): string | null {
    const token = this.getToken();
    if (token) {
      // Decodifica el token JWT para obtener la información del usuario
      const tokenPayload = this.decodeToken();

      // Busca la propiedad que contiene el tipo de usuario dentro del objeto decodificado
      // Puedes ajustar esta línea según la estructura real del token
      const userType = tokenPayload && (tokenPayload.role || tokenPayload.tipoUsuario);

      return userType || null;
    } else {
      // Muestra un mensaje de error si el usuario no ha iniciado sesión
      Swal.fire('Error', 'No se ha iniciado sesión', 'error');
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        const tokenPayload = this.parseJwt(token);
        console.log('Token Decodificado:', tokenPayload);
        return tokenPayload;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    } else {
      console.error('No se encontró un token en el almacenamiento local.');
      return null;
    }
  }
  
  getIdCuenta(): string | null {
    const tokenPayload = this.decodeToken();
    console.log('Token Payload en getIdCuenta:', tokenPayload);
  
    if (tokenPayload) {
      // Ajusta esta línea según la estructura real del token
      const idCuenta = tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
      console.log('ID de Cuenta en getIdCuenta:', idCuenta);
  
      if (idCuenta) {
        return idCuenta;
      } else {
        console.error('No se encontró la propiedad id_cuenta en el token.');
      }
    }
    return null;
  }
  
  getNombreUsuario(): string | null {
    const tokenPayload = this.decodeToken();
    console.log('Token Payload en getNombreUsuario:', tokenPayload);
  
    if (tokenPayload) {
      // Ajusta esta línea según la estructura real del token
      const nombreUsuario = tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
      console.log('Nombre del usuario', nombreUsuario);
  
      if (nombreUsuario) {
        return nombreUsuario;
      } else {
        console.error('No se encontró la propiedad el nombre en el token.');
      }
    }
    return null;
  }
  
  getrol(): string | null {
    const tokenPayload = this.decodeToken();
    console.log('Token Payload en getrol:', tokenPayload);
  
    if (tokenPayload) {
      // Ajusta esta línea según la estructura real del token
      const getrol = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      console.log('Rol del usuario', getrol);
  
      if (getrol) {
        return getrol;
      } else {
        console.error('No se encontró la propiedad el rol en el token.');
      }
    }
    return null;
  }
  
  
  
  

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al parsear el token JWT:', error);
      return null;
    }
  }
  
}
