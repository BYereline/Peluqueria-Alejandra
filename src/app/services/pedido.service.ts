import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Pedido} from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
 
  // LISTA DE PRODUCTOS
  pedidosList: AngularFireList <any>; 
  selectedCarrito: Pedido = new Pedido();

  constructor(private firebase:AngularFireDatabase) { }

  getPedidos() 
  {
    return this.pedidosList = this.firebase.list('pedidos');
  }

  insertPedido(pedido: Pedido)
  {
    this.pedidosList.push({
      pedidos: pedido.pedidos,
      status: pedido.status,
    });
  }  

  updatePedido(pedido: Pedido)
  {
    this.pedidosList.update(pedido.skey,{
      pedidos: pedido.pedidos,
      status: pedido.status,
    });
  }

  deletePedido (skey: string)
  {
    this.pedidosList.remove(skey);
  }
}
