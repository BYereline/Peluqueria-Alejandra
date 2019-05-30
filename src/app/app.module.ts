import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

//Conexion con firebase----
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';

//-------

//components
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';

//services
import {ProductService} from './services/product.service';
import {OuthService} from './services/outh.service';
import {CarritoService} from './services/carrito.service';
import {CitaService} from './services/cita.service';
import {PedidoService} from './services/pedido.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CitasComponent } from './components/citas/citas.component';
import { CitaComponent } from './components/citas/cita/cita.component';
import { CitaListComponent } from './components/citas/cita-list/cita-list.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ClientesComponent } from './components/pedidos/clientes/clientes.component';
import { EsteticaComponent } from './components/pedidos/estetica/estetica.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { InicioSesionComponent } from './components/login/inicio-sesion/inicio-sesion.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    CatalogoComponent,
    routingComponents,
    CitasComponent,
    CitaComponent,
    CitaListComponent,
    PedidosComponent,
    ClientesComponent,
    EsteticaComponent,
    LoginComponent,
    RegistroComponent,
    InicioSesionComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Conexion con firebase----
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    //-------
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    //services
    ProductService,
    OuthService,
    CarritoService,
    CitaService,
    PedidoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
