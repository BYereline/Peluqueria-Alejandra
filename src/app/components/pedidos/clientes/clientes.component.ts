import { Component, OnInit } from '@angular/core';

//service
import {PedidoService} from '../../../services/pedido.service';
import {ToastrService} from 'ngx-toastr'; 
 
//class product
import {Pedido} from '../../../models/pedido';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  pedidoList: Pedido[];
  nuevoPedido: Pedido = new Pedido();
  nuevoPedidoAux: Pedido = new Pedido();

  pedidos_P = [];
  status = [];

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
          this.status = [];
          
          for(let i=0; i<this.pedidoList.length;i++){
            if(this.pedidoList[i].pedidos){
              let n =  Object.keys(this.pedidoList[i].pedidos).length;
                  for(let j=0;j < n;j++){
                    let indice = Object.keys(this.pedidoList[i].pedidos)[j];
                        if(indice && this.pedidoList[i].pedidos[indice].user == 'BYereline'){
                        this.pedidos_P.push(this.pedidoList[i].pedidos[indice]); 
                        this.status.push(this.pedidoList[i].status);
                        }                  
                  }
                }            
          }
         // console.log(this.pedidos_P);
         // console.log(this.pedidos_A);
        });
       
      }

}
