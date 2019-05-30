import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
 
//service
import {CitaService} from '../../../services/cita.service';
import {ToastrService} from 'ngx-toastr';

import {AngularFireStorage} from '@angular/fire/storage';

 
//product class
import {Cita} from '../../../models/cita';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

    citaAdd: Cita = new Cita();

  constructor(private citaService: CitaService,
    private storage : AngularFireStorage,
    private toastr: ToastrService) { }
 
  ngOnInit() {
    this.citaService.getCitas();
  }

   agendar(citaForm: NgForm) {
    var f = new Date();
 
    if(citaForm.value.motivo && citaForm.value.fecha && citaForm.value.trabajo){
        var hora = f.getHours() +':' + f.getMinutes() + 'hrs.';
        this.citaAdd.motivo = citaForm.value.motivo;
        this.citaAdd.fecha = citaForm.value.fecha;
        this.citaAdd.hora = hora;
        this.citaAdd.user = 'BYereline';
        this.citaAdd.trabajo = citaForm.value.trabajo;

        if(citaForm.value.skey == null){
          console.log("Insertar");
          this.citaService.insertCita(this.citaAdd);
        }else{
          console.log("actualizar");
          this.citaAdd.skey = citaForm.value.skey;
          this.citaService.updateCita(this.citaAdd,citaForm.value.motivo);
        }

      this.resetForm(citaForm);
    }
    else{
      this.toastr.warning('Datos errones','Advertencia');
    }

  }

  resetForm(citaForm? : NgForm)
  {
    if(citaForm != null)
    citaForm.reset();
    this.citaService.selectedCita = new Cita();
  }



}
