import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryServiceService {

 //servicio que hace el post hacia al cloudinary, necesario importarlo donde se use el upload
 constructor(private http: HttpClient) { }

 uploadImage(file: File): Promise<any> {
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', 'ml_default');

   return this.http.post('https://api.cloudinary.com/v1_1/dspugxtgr/image/upload', formData).toPromise();
 }
}

