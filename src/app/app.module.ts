import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContenedorPrincipalComponent } from './contenedor-principal/contenedor-principal.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContenidoPaginaPrincipalComponent } from './contenido-pagina-principal/contenido-pagina-principal.component';
import { ContenedorAgendaAdministradorComponent } from './contenedor-agenda-administrador/contenedor-agenda-administrador.component';
import { ContenedorAgendaUsuarioComponent } from './contenedor-agenda-usuario/contenedor-agenda-usuario.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';
import { PaginaPrincipalUsuarioComponent } from './pagina-principal-usuario/pagina-principal-usuario.component';
import { PaginaPrincipalAdministradorComponent } from './pagina-principal-administrador/pagina-principal-administrador.component';
import { ContenedorDetalleProductoComponent } from './contenedor-detalle-producto/contenedor-detalle-producto.component';
import { NavAdministradorComponent } from './nav-administrador/nav-administrador.component';
import { NavUsuarioComponent } from './nav-usuario/nav-usuario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TarjetaCreditoPerfilComponent } from './tarjeta-credito-perfil/tarjeta-credito-perfil.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { TerminosComponent } from './terminos/terminos.component';
import { DatosPaginaComponent } from './datos-pagina/datos-pagina.component';
import { CangearPuntosComponent } from './cangear-puntos/cangear-puntos.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { EliminarAdministradorSpAdComponent } from './eliminar-administrador-sp-ad/eliminar-administrador-sp-ad.component';
import { EliminarUsuarioSpAdComponent } from './eliminar-usuario-sp-ad/eliminar-usuario-sp-ad.component';
import { EliminarUsuarioAdministradorSpAdComponent } from './eliminar-usuario-administrador-sp-ad/eliminar-usuario-administrador-sp-ad.component';
import { AgregarPuntosComponent } from './agregar-puntos/agregar-puntos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerticalModalComponent } from './vertical-modal/vertical-modal.component';
import { PerifericosComponent } from './perifericos/perifericos.component';
import { CategoriaPantallasComponent } from './categoria-pantallas/categoria-pantallas.component';
import { BuxcarProductosComponent } from './buxcar-productos/buxcar-productos.component';
import { CategoriaChasisComponent } from './categoria-chasis/categoria-chasis.component';
import { CategoriaSillasComponent } from './categoria-sillas/categoria-sillas.component';



@NgModule({
  declarations: [
    AppComponent,
    ContenedorPrincipalComponent,
    NavComponent,
    FooterComponent,
    ContenidoPaginaPrincipalComponent,
    ContenedorAgendaAdministradorComponent,
    ContenedorAgendaUsuarioComponent,
    RegistroLoginComponent,
    PaginaPrincipalUsuarioComponent,
    PaginaPrincipalAdministradorComponent,
    ContenedorDetalleProductoComponent,
    NavAdministradorComponent,
    NavUsuarioComponent,
    PerfilUsuarioComponent,
    TarjetaCreditoPerfilComponent,
    PrivacidadComponent,
    TerminosComponent,
    DatosPaginaComponent,
    CangearPuntosComponent,
    SuperAdminComponent,
    EliminarAdministradorSpAdComponent,
    EliminarUsuarioSpAdComponent,
    EliminarUsuarioAdministradorSpAdComponent,
    AgregarPuntosComponent,
    CarritoComponent,
    AlmacenComponent,
    VerticalModalComponent,
    PerifericosComponent,
    CategoriaPantallasComponent,
    BuxcarProductosComponent,
    CategoriaChasisComponent,
    CategoriaSillasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
