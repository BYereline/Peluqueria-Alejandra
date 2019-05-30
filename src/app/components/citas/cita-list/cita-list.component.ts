import { Component, OnInit } from '@angular/core';

//service
import {CitaService} from '../../../services/cita.service';
import {ToastrService} from 'ngx-toastr';
 
//class product
import {Cita} from '../../../models/cita';
import { createInjectable } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.css']
})
export class CitaListComponent implements OnInit {

  citaList: Cita[]; 
  citaEst: Cita[];
  citaMan: Cita[];
  citaEstA: Cita [];
  citaManA: Cita[];

  constructor(private citaService: CitaService,
    private toastr: ToastrService
    ) { }

    ngOnInit() {
      this.citaService.getCitas()
        .snapshotChanges()
        .subscribe(item => {
          this.citaList = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x ["skey"] = element.key;
            this.citaList.push(x as Cita);
          });
        });

        this.citaService.getCitasE()
        .snapshotChanges()
        .subscribe(item => {
          this.citaEst = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x ["skey"] = element.key;
            this.citaEst.push(x as Cita);
          });
        });


        this.citaService.getCitasM()
        .snapshotChanges()
        .subscribe(item => {
          this.citaMan = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x ["skey"] = element.key;
            this.citaMan.push(x as Cita);
          });
        });

        this.citaService.getCitasEA()
        .snapshotChanges()
        .subscribe(item => {
          this.citaEstA = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x ["skey"] = element.key;
            this.citaEstA.push(x as Cita);
          });
        });


        this.citaService.getCitasMA()
        .snapshotChanges()
        .subscribe(item => {
          this.citaManA = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x ["skey"] = element.key;
            this.citaManA.push(x as Cita);
          });
        });
        
    }
  
      onEdit(cita: Cita)
      {
        console.log("Edit",cita.motivo);
        this.citaService.selectedCita = Object.assign({},cita);
      }
  
      onDelete(cita: Cita)
      {
        console.log("Delete",cita.motivo);
        if(confirm('Estas seguro de querer eliminarlo?')){
          this.citaService.deleteCita(cita,cita.motivo);
          this.toastr.success('ELIMINADO', 'Producto Eliminado');
        }
      } 

      onAcept(cita: Cita)
      {
        console.log("Aceptar",cita.motivo);
        if(confirm('Estas seguro de querer aceptar?')){
          this.citaService.aceptCita(cita, cita.motivo);
          this.toastr.success('cita aceptada', 'Aceptado');
        }
      }
      onCancel(cita: Cita)
      {
        console.log("Cancel",cita.motivo);
        if(confirm('Estas seguro de querer cancelar?')){
          this.citaService.cancelCita(cita, cita.motivo);
          this.toastr.success('cita cancelada', 'Cancelado');
        }
      }
      onEnd(cita: Cita)
      {
        console.log("terminar",cita.motivo);
        if(confirm('Estas seguro de querer terminar?')){
          this.citaService.endCita(cita,cita.motivo);
          this.toastr.success('cita terminada', 'Terminado');
        }
      }

}
