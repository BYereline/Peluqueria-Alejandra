import { Component, OnInit } from '@angular/core';



//service
import {ProductService} from '../../../services/product.service';
import {CarritoService} from '../../../services/carrito.service';

import {ToastrService} from 'ngx-toastr';

import {AngularFireStorage} from '@angular/fire/storage';


//product class
import {Carrito} from '../../../models/carrito';
import {Product} from '../../../models/product';

@Component({ 
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  productList: Product[];
  carritosList: Carrito[];

  nuevoCarrito: Carrito = new Carrito();

  constructor(
    private productService: ProductService,
    private storage : AngularFireStorage, 
    private carritoService: CarritoService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x ["skey"] = element.key;
          this.productList.push(x as Product);
        });
      });

      this.carritoService.getCarritos()
      .snapshotChanges()
      .subscribe(item => {
        this.carritosList = [];
        item.forEach(element => {
          let y = element.payload.toJSON();
          y ["skey"] = element.key;
          this.carritosList.push(y as Carrito);
        });
      });
      
  }

  addCarrito(product: Product, userIn: string)
  {
    let bandera = 0;
    var f = new Date();
  
    // BUSCAR SI USUARIO YA TIENE UN CARRITO ABIERTO
      for(let i=0;i < this.carritosList.length; i++){

        if(this.carritosList[i].user == userIn){
          bandera = 1;
          this.nuevoCarrito= this.carritosList[i];
          i = this.carritosList.length;
        }
      }

      if(bandera == 1){
       // console.log("Se encontro usuario en carritos");
        let bandera_prod = 0;

        // BUSCAR SU CARRITO CONTIENE EL PRODUCTO A AGREGAR
       // console.log(this.nuevoCarrito.productos);
        let tamano_arreglo = Object.keys(this.nuevoCarrito.productos).length;
        var encontro = 0;
        for(let k=0; k < tamano_arreglo; k++){
          let indice = Object.keys(this.nuevoCarrito.productos)[k];
          //console.log( this.nuevoCarrito.productos[k]);
          encontro =  this.nuevoCarrito.productos[indice].skey_prod.indexOf(product.skey);
          if(encontro != -1)
          {
            bandera_prod = 1;
            this.nuevoCarrito.productos[indice].cantidad ++;
           // console.log(this.nuevoCarrito.productos[k].cantidad); IMPRIME CANTIDADES
            
          }
         //https://es.stackoverflow.com/questions/39525/como-obtener-length-de-un-json
        } 

        let totalF = 0;
        if(bandera_prod != 1){
          console.log("No se encontro producto en carrito");         
          this.nuevoCarrito.productos[product.skey] = {skey_prod: product.skey, cantidad:1};
        }

        totalF = this.nuevoCarrito.total;
        totalF+=product.precio;
        this.nuevoCarrito.total = totalF;
        this.nuevoCarrito.fecha = f.getDate() +  `, ` + (f.getMonth() + 1) +  `, ` + f.getFullYear();
        this.carritoService.updateCarrito(this.nuevoCarrito);

      }
      else{
        console.log("No se encontro usuario en carritos");
        // SI NO EXISTE CARRITO CREADO POR EL USUARIO, SE CREA UN NUEVO CARRITO
        this.nuevoCarrito.fecha = f.getDate() +  `, ` + (f.getMonth() + 1) +  `, ` + f.getFullYear();
        this.nuevoCarrito.total = product.precio;
        this.nuevoCarrito.productos = [{skey_prod: product.skey, cantidad:1}];
        this.nuevoCarrito.productos[product.skey] = {skey_prod: product.skey, cantidad:1};
        delete this.nuevoCarrito.productos['0'];
        this.nuevoCarrito.user = userIn;
        this.carritoService.insertCarrito(this.nuevoCarrito);
        
      } 

  }

  
  
}
