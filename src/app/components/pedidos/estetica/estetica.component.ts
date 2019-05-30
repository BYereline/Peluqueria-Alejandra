import { Component, OnInit } from '@angular/core';

//service
import {PedidoService} from '../../../services/pedido.service';
import {ToastrService} from 'ngx-toastr';
 
//class product
import {Pedido} from '../../../models/pedido';

@Component({
  selector: 'app-estetica',
  templateUrl: './estetica.component.html',
  styleUrls: ['./estetica.component.css']
})
export class EsteticaComponent implements OnInit {

  pedidoList: Pedido[];
  nuevoPedido: Pedido = new Pedido();
  nuevoPedidoAux: Pedido = new Pedido();

  pedidos_P = [];
  pedidos_A = [];

  constructor(private pedidoService: PedidoService,
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
          this.pedidos_P = [];
          this.pedidos_A = [];
          for(let i=0; i<this.pedidoList.length;i++){
            if(this.pedidoList[i].pedidos){
              let n =  Object.keys(this.pedidoList[i].pedidos).length;
                  for(let j=0;j < n;j++){
                    let indice = Object.keys(this.pedidoList[i].pedidos)[j];
                      if(this.pedidoList[i].status == "Pendiente"){
                        if(indice)
                        this.pedidos_P.push(this.pedidoList[i].pedidos[indice]);
                      }
                      else if(this.pedidoList[i].status == "Aceptado"){
                        if(indice)
                        this.pedidos_A.push(this.pedidoList[i].pedidos[indice]);
                      }
                  }
                }            
          }
         // console.log(this.pedidos_P);
         // console.log(this.pedidos_A);
        });
       
      }

      onAcept(skey_ped: string)
      {
        console.log("Aceptar");
        //console.log(skey_ped,'***');
        if(confirm('Estas seguro de querer aceptar?')){
                   
              //AGREGAR A LISTA DE PEDIDOS
          let bandera = 0;

          for(let i =0 ; i<this.pedidoList.length; i++){
            if(this.pedidoList[i].status == "Aceptado"){
              bandera = 1;
              this.nuevoPedido = this.pedidoList[i];
            } 
          }
          
          if(bandera == 1){
            for(let i =0 ; i<this.pedidoList.length; i++){
              if(this.pedidoList[i].status == "Pendiente"){
                this.nuevoPedidoAux = this.pedidoList[i];
              }
            }

           // console.log("Ya hay lista de aceptados");
            let n = Object.keys(this.nuevoPedido.pedidos).length;
            for(let i=0;i<n;i++){
                this.nuevoPedido.pedidos[skey_ped] = {
                  skey_ped: this.nuevoPedidoAux.pedidos[skey_ped].skey_ped,
                  user: this.nuevoPedidoAux.pedidos[skey_ped].user,
                  productos: this.nuevoPedidoAux.pedidos[skey_ped].productos,
                  total: this.nuevoPedidoAux.pedidos[skey_ped].total,
                  fecha: this.nuevoPedidoAux.pedidos[skey_ped].fecha
                };
        
                this.pedidoService.updatePedido (this.nuevoPedido);

              i = n;
              
            }
              for(let i =0 ; i<this.pedidoList.length; i++){
                if(this.pedidoList[i].status == "Pendiente"){
                  this.nuevoPedido = this.pedidoList[i];
                }
              }

              let m = Object.keys(this.nuevoPedido.pedidos).length;
              if (m == 1){
                this.pedidoService.deletePedido(this.nuevoPedido.skey);
              }else{
              for(let i=0;i<m;i++){
                let indice = Object.keys(this.nuevoPedido.pedidos)[i];
                if(this.nuevoPedido.pedidos[indice].skey_ped == skey_ped){
                  delete this.nuevoPedido.pedidos[indice];
                  this.pedidoService.updatePedido (this.nuevoPedido);
                i = m;
                }
              }
            }
            

          }
          else{
           // console.log("No existen mas pedidos Aceptados");  
            for(let i =0 ; i<this.pedidoList.length; i++){
              if(this.pedidoList[i].status == "Pendiente"){
                this.nuevoPedido = this.pedidoList[i];
              }
            }

            let m = Object.keys(this.nuevoPedido.pedidos).length;
            for(let i=0;i<m;i++){
              let indice = Object.keys(this.nuevoPedido.pedidos)[i];
              if(this.nuevoPedido.pedidos[indice].skey_ped == skey_ped){
                this.nuevoPedido.status = "Aceptado";
                this.nuevoPedido.pedidos[skey_ped] = {
                  skey_ped: this.nuevoPedido.pedidos[skey_ped].skey_ped,
                  user: this.nuevoPedido.pedidos[skey_ped].user,
                  productos: this.nuevoPedido.pedidos[skey_ped].productos,
                  total: this.nuevoPedido.pedidos[skey_ped].total,
                  fecha: this.nuevoPedido.pedidos[skey_ped].fecha
                };
        
                this.pedidoService.insertPedido (this.nuevoPedido);
              i = m;
              }
            }

            for(let i =0 ; i<this.pedidoList.length; i++){
              if(this.pedidoList[i].status == "Pendiente"){
                this.nuevoPedido = this.pedidoList[i];
              }
            }
              m = Object.keys(this.nuevoPedido.pedidos).length;
              if (m == 1){
                this.pedidoService.deletePedido(this.nuevoPedido.skey);
              }else{
              for(let i=0;i<m;i++){
                let indice = Object.keys(this.nuevoPedido.pedidos)[i];
                if(this.nuevoPedido.pedidos[indice].skey_ped == skey_ped){
                  this.nuevoPedido.status = "Pendiente";
                  delete this.nuevoPedido.pedidos[indice];
                  this.pedidoService.updatePedido (this.nuevoPedido);
                }
                i = m;
                }
              }


          }

          this.toastr.success('cita aceptada', 'Aceptado');
        }
      }

      onCancel(pedido: Pedido)
      {
        console.log("Cancel");
        if(confirm('Estas seguro de querer cancelar?')){
          
          


          this.toastr.success('cita cancelada', 'Cancelado');
        }
      }

      onEnd(pedido: Pedido)
      {
        console.log("terminar");
        if(confirm('Estas seguro de querer terminar?')){
          
          


          this.toastr.success('cita terminada', 'Terminado');
        }
      }





}
