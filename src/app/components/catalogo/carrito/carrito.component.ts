import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

//service
import {CarritoService} from '../../../services/carrito.service';
import {PedidoService} from '../../../services/pedido.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProductService} from '../../../services/product.service';

//product class
import {Product} from '../../../models/product'; 
import {Carrito} from '../../../models/carrito';
import {Pedido} from '../../../models/pedido';

 
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  productList: Product[];
  carritosList: Carrito[];
  pedidoList: Pedido[];

  productosCarro: Product[] = [];
  cantidades: number[] = [];
  totales: number[] = [];

  totalCarrito: number;
  
  nuevoPedido: Pedido = new Pedido();
  nuevoCarrito: Carrito = new Carrito();
 
  constructor(
    private productService: ProductService,
    private storage : AngularFireStorage, 
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.pedidoService.getPedidos()
      .snapshotChanges()
      .subscribe(item => {
        this.pedidoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x ["skey"] = element.key;
          this.pedidoList.push(x as Pedido);
        });
      });

    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x ["skey"] = element.key;
        this.productList.push(x as Product);
        console.log("cargo producto");
      });
      this.carritoService.getCarritos()
      .snapshotChanges()
      .subscribe(item => {
        this.carritosList = [];
        item.forEach(element => {
          let y = element.payload.toJSON();
          y ["skey"] = element.key;
          this.carritosList.push(y as Carrito);
         // console.log("cargo carrito");
        });

        this.productosCarro = [];
        this.cantidades = [];
        this.totales = [];
        this.totalCarrito = 0;
        for (let n=0; n < this.carritosList.length; n++){
          //console.log("Entro for carritos");
          if(this.carritosList[n].user == 'BYereline'){
            //console.log("Encontro usuario");
            this.nuevoCarrito = this.carritosList[n];
            this.desplegar(this.nuevoCarrito);
            n = this.carritosList.length;
          }
        }

      });
     
    });


  }


  desplegar(carrito: Carrito){
    this.productosCarro = [];
    this.cantidades = [];
    this.totales = [];
    if (carrito.skey){
        this.totalCarrito = carrito.total;
          let n =  Object.keys(this.nuevoCarrito.productos).length;
          let m = this.productList.length;
      
          for(let i=0 ; i < n ; i++){
            let indice = Object.keys(this.nuevoCarrito.productos)[i];
            if(carrito.productos[indice] && carrito.productos[indice].skey_prod){
              let skey = carrito.productos[indice].skey_prod;
            for (let j=0; j <m ; j++){
              if(this.productList[j].skey == skey){
                  // console.log("encontro prod");
                  this.productosCarro.push(this.productList[j]);
                  this.cantidades.push(carrito.productos[indice].cantidad);
                  this.totales.push(this.productList[j].precio * carrito.productos[indice].cantidad);
                j = m;
              }
            }
            }
          }
      }
  }



   sumar(prodSkey: string){
  //  console.log("sumar ** ",prodSkey);
    let n =  Object.keys(this.nuevoCarrito.productos).length;
    let m = this.productList.length;

    for(let i=0 ; i < n ; i++){
      let indice = Object.keys(this.nuevoCarrito.productos)[i];
      if(this.nuevoCarrito.productos[indice].skey_prod == prodSkey){
          for (let j=0; j <m ; j++){
            if(this.productList[j].skey == prodSkey){
             // console.log(this.productList[j].skey, i);
              this.nuevoCarrito.productos[indice].cantidad ++;
              this.nuevoCarrito.total += this.productList[j].precio;
              this.carritoService.updateCarrito(this.nuevoCarrito);
              j = m;
            } 
          }
        i = n;
      }
    }

   }


  restar(prodSkey: string){
   // console.log("restar **", prodSkey);
    let n =  Object.keys(this.nuevoCarrito.productos).length;
    let m = this.productList.length;

    for(let i=0 ; i < n ; i++){
      let indice = Object.keys(this.nuevoCarrito.productos)[i];
      if(this.nuevoCarrito.productos[indice].skey_prod == prodSkey){
        for (let j=0; j <m ; j++){
          if(this.productList[j].skey == prodSkey){

          if(this.nuevoCarrito.productos[indice].cantidad == 1){
           // console.log(this.nuevoCarrito.productos);
              delete this.nuevoCarrito.productos[indice];
           // console.log(this.nuevoCarrito.productos);
           
          }else{
          this.nuevoCarrito.productos[indice].cantidad --;
          
          }
          this.nuevoCarrito.total -= this.productList[j].precio;
          this.carritoService.updateCarrito(this.nuevoCarrito);
          
            j = m;
          } 
        }
        i = n;
      }
    }
   
   }
 
  hacerPedido(){
    if(this.nuevoCarrito.skey){
      let skeyC = this.nuevoCarrito.skey;
      //AGREGAR A LISTA DE PEDIDOS
       let bandera = 0;

      for(let i =0 ; i<this.pedidoList.length; i++){
        if(this.pedidoList[i].status == "Pendiente"){
          bandera = 1;
          this.nuevoPedido = this.pedidoList[i];
        }
      }

      if(bandera == 1){
        console.log("Existen mas pedidos pendientes");
        this.nuevoPedido.status = "Pendiente"
        
        this.nuevoPedido.pedidos[skeyC] = {
          skey_ped: this.nuevoCarrito.skey,
          user: this.nuevoCarrito.user,
          productos: this.nuevoCarrito.productos,
          total: this.nuevoCarrito.total,
          fecha: this.nuevoCarrito.fecha
        };

        this.pedidoService.updatePedido (this.nuevoPedido);

      }
      else{
        console.log("No existen mas pedidos pedientes");
        this.nuevoPedido.status = "Pendiente"

        this.nuevoPedido.pedidos = [{ 
          skey_ped: this.nuevoCarrito.skey,
          user: this.nuevoCarrito.user,
          productos: this.nuevoCarrito.productos,
          total: this.nuevoCarrito.total,
          fecha: this.nuevoCarrito.fecha}];

        this.nuevoPedido.pedidos[skeyC] = {
          skey_ped: this.nuevoCarrito.skey,
          user: this.nuevoCarrito.user,
          productos: this.nuevoCarrito.productos,
          total: this.nuevoCarrito.total,
          fecha: this.nuevoCarrito.fecha
        };

        delete this.nuevoPedido.pedidos['0'];
        this.pedidoService.insertPedido(this.nuevoPedido);


      }
      this.carritoService.deleteCarrito(this.nuevoCarrito.skey);
      this.toastr.success('Pedido enviado correctamente', 'Enviado');
    }else{
      this.toastr.warning('No hay productos en carrito', 'Advertencia');
    }
  }
}
