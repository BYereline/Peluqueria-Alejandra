import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Cita} from '../models/cita'; 

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  // LISTA DE PRODUCTOS
  CitaList: AngularFireList <any>; 
  citaEst: AngularFireList <any>; 
  citaMan: AngularFireList <any>; 
  citaEstA: AngularFireList <any>; 
  citaManA: AngularFireList <any>;
  selectedCita: Cita = new Cita();

  constructor(private firebase:AngularFireDatabase) { }
 
  getCitas() 
  {
    return this.CitaList = this.firebase.list('citas');
  }

  getCitasE() 
  {
    return this.citaEst = this.firebase.list('brenda-pendientes');
  }

  getCitasM() 
  {
    return this.citaMan = this.firebase.list('alejandra-pendientes');
  }

  getCitasEA() 
  {
    return this.citaEstA = this.firebase.list('brenda-aceptadas');
  }

  getCitasMA() 
  {
    return this.citaManA = this.firebase.list('alejandra-aceptadas');
  }

  insertCita(cita: Cita)
  {
    this.CitaList.push({
      user: cita.user,
      motivo: cita.motivo,
      fecha: cita.fecha,
      hora: cita.hora,
      trabajo: cita.trabajo
    });

    if(cita.motivo == "Estilista"){
      this.citaEst.push({
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
    }
    
    else if (cita.motivo == "Manicurista"){
      this.citaMan.push({
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
    }
  }  

  updateCita(cita: Cita, motivo: string)
  {
    console.log(motivo);
    this.CitaList.update(cita.skey,{
      user: cita.user,
      motivo: cita.motivo,
      fecha: cita.fecha,
      hora: cita.hora,
      trabajo: cita.trabajo
    });

    if(motivo == "Estilista"){
      this.citaEst.update(cita.skey,{
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
    }
    
    else if (motivo == "Manicurista"){
      this.citaMan.update(cita.skey,{
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
    }

  }

  deleteCita (cita: Cita , motivo: string)
  {
    if(motivo == "Estilista"){
      this.citaEst.remove(cita.skey);
    }
    else if (motivo == "Manicurista"){
      this.citaMan.remove(cita.skey);
    }

    this.CitaList.remove(cita.skey);
     
  }

  aceptCita (cita: Cita , motivo: string){
    if(motivo == "Estilista"){
      this.citaEstA.push({
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
      this.citaEst.remove(cita.skey);

    }
    else if(motivo == "Manicurista"){
      this.citaManA.push({
        user: cita.user,
        motivo: cita.motivo,
        fecha: cita.fecha,
        hora: cita.hora,
        trabajo: cita.trabajo
      });
      this.citaMan.remove(cita.skey);
    }

  }
  cancelCita(cita: Cita , motivo: string){
    if(motivo == "Estilista"){
      this.citaEst.remove(cita.skey);

    }else if(motivo == "Manicurista"){
      this.citaMan.remove(cita.skey);
    }
    
  }

  endCita(cita: Cita, motivo: string){
    if(motivo == "Estilista"){
      this.citaEstA.remove(cita.skey);
      this.CitaList.remove(cita.skey);

    }else if(motivo == "Manicurista"){
      this.citaManA.remove(cita.skey);
      this.CitaList.remove(cita.skey);
    }
  }
}
