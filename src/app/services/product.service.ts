import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
}) 
export class ProductService {
// LISTA DE PRODUCTOS
  productList: AngularFireList <any>; 
  selectedProduct: Product = new Product();

  constructor(private firebase:AngularFireDatabase) { }

  getProducts() 
  {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product)
  {
    this.productList.push({
      name: product.name,
      descripcion: product.descripcion,
      categoria: product.categoria,
      precio: product.precio
    });
  }  

  updateProduct(product: Product)
  {
    this.productList.update(product.skey,{
      name: product.name,
      descripcion: product.descripcion,
      categoria: product.categoria,
      precio: product.precio
    });
  }

  deleteProduct (skey: string)
  {
    this.productList.remove(skey);
  }

}

