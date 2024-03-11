import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorPrincipalComponent } from "../app/contenedor-principal/contenedor-principal.component";
import { ContenedorAgendaAdministradorComponent } from "../app/contenedor-agenda-administrador/contenedor-agenda-administrador.component";
import { ContenedorDetalleProductoComponent } from './contenedor-detalle-producto/contenedor-detalle-producto.component';
import {PaginaPrincipalAdministradorComponent} from'./pagina-principal-administrador/pagina-principal-administrador.component';
import { PaginaPrincipalUsuarioComponent } from './pagina-principal-usuario/pagina-principal-usuario.component';
import { ContenedorAgendaUsuarioComponent } from './contenedor-agenda-usuario/contenedor-agenda-usuario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TarjetaCreditoPerfilComponent } from './tarjeta-credito-perfil/tarjeta-credito-perfil.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { TerminosComponent } from './terminos/terminos.component';
import { DatosPaginaComponent } from './datos-pagina/datos-pagina.component';
import { CangearPuntosComponent } from './cangear-puntos/cangear-puntos.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { EliminarAdministradorSpAdComponent } from './eliminar-administrador-sp-ad/eliminar-administrador-sp-ad.component';
import { EliminarUsuarioAdministradorSpAdComponent } from './eliminar-usuario-administrador-sp-ad/eliminar-usuario-administrador-sp-ad.component';
import { EliminarUsuarioSpAdComponent } from './eliminar-usuario-sp-ad/eliminar-usuario-sp-ad.component';
import { AgregarPuntosComponent } from './agregar-puntos/agregar-puntos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AuthGuard } from './servicios/guard/auth.guard';
import { AlmacenComponent } from './almacen/almacen.component';
import { PerifericosComponent } from './perifericos/perifericos.component';
import { CategoriaPantallasComponent } from './categoria-pantallas/categoria-pantallas.component';
import { BuxcarProductosComponent } from './buxcar-productos/buxcar-productos.component';
import { CategoriaChasisComponent } from './categoria-chasis/categoria-chasis.component';
import { CategoriaSillasComponent } from './categoria-sillas/categoria-sillas.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'home' ,component: ContenedorPrincipalComponent},
  {path:"agregarPuntos",component:AgregarPuntosComponent},
  {path:'Login',component:RegistroLoginComponent},
  {path:"Producto/:id", component:ContenedorDetalleProductoComponent},
  {path:"Administrador", component: PaginaPrincipalAdministradorComponent, canActivate: [AuthGuard]},
  {path:'Usuario', component:PaginaPrincipalUsuarioComponent, canActivate: [AuthGuard]},
  {path:"Agenda-Administrador",component:ContenedorAgendaAdministradorComponent, canActivate: [AuthGuard]},
  {path:"Agenda-Usuario",component:ContenedorAgendaUsuarioComponent,canActivate: [AuthGuard]},
  {path:"perfilUser", component:PerfilUsuarioComponent,canActivate: [AuthGuard]},
  {path:'tarjetaCredito', component:TarjetaCreditoPerfilComponent,canActivate: [AuthGuard] },
  { path:'privacidad' , component:PrivacidadComponent },
  { path:'terminos' , component:TerminosComponent },
  { path:'datosPagina' , component:DatosPaginaComponent },
  { path:'CangearPuntos' , component:CangearPuntosComponent,canActivate: [AuthGuard]},
  { path:'super-admin' , component:SuperAdminComponent,canActivate: [AuthGuard]},
  { path:'eliminarAdministradorSpAd' , component:EliminarAdministradorSpAdComponent,canActivate: [AuthGuard]},
  { path:'eliminarUsuarioAdministradorSpAd' , component:EliminarUsuarioAdministradorSpAdComponent,canActivate: [AuthGuard]},
  { path:'eliminarUsuarioSpAd' , component:EliminarUsuarioSpAdComponent,canActivate: [AuthGuard]},
  { path:'carrito' , component:CarritoComponent},
  { path:'Almacen' , component:AlmacenComponent,canActivate: [AuthGuard]},
  { path:'Perifericos' , component:PerifericosComponent},
  { path: 'Pantallas' , component:CategoriaPantallasComponent},
  { path: 'BuscarProductosComponent' , component:BuxcarProductosComponent},
  { path: 'CategoriaChasis' , component:CategoriaChasisComponent},
  { path: 'CategoriaSillas' , component:CategoriaSillasComponent},

  { path: '**', redirectTo: 'home' } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
