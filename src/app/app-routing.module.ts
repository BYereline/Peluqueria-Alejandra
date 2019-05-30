import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VentaComponent} from './components/catalogo/venta/venta.component';
import {CarritoComponent} from './components/catalogo/carrito/carrito.component';
import {ProductsComponent} from './components/products/products.component';
import {CitasComponent} from './components/citas/citas.component';
import {PedidosComponent} from './components/pedidos/pedidos.component';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegistroComponent} from './components/login/registro/registro.component';
import {InicioSesionComponent} from './components/login/inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path: 'venta', component: VentaComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'productos', component: ProductsComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio', component: InicioSesionComponent},
  {path: '**', component: NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
export const routingComponents = [VentaComponent, CarritoComponent, ProductsComponent, 
  CitasComponent, PedidosComponent, LoginComponent, RegistroComponent, InicioSesionComponent, NotFoundComponent];