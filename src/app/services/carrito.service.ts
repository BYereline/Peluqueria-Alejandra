import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Carrito} from '../models/carrito';
 
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // LISTA DE PRODUCTOS
  carritosList: AngularFireList <any>; 
  selectedCarrito: Carrito = new Carrito();

  constructor(private firebase:AngularFireDatabase) { }

  getCarritos() 
  {
    return this.carritosList = this.firebase.list('carritos');
  }

  insertCarrito(carrito: Carrito)
  {
    this.carritosList.push({
      user: carrito.user,
      productos: carrito.productos,
      total: carrito.total,
      fecha: carrito.fecha
    });
  }  

  updateCarrito(carrito: Carrito)
  {
    this.carritosList.update(carrito.skey,{
      user: carrito.user,
      productos: carrito.productos,
      total: carrito.total,
      fecha: carrito.fecha
    });
  }

  deleteCarrito (skey: string)
  {
    this.carritosList.remove(skey);
  }


}
