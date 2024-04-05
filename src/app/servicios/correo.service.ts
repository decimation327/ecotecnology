import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  enviarCorreo(datosCorreo: any) {
    return this.http.post('https://sevidor-correo.onrender.com/send-email', datosCorreo);
  }
}
