import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import {OuthService} from '../../../services/outh.service';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: OuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  onSubmitAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res)=>{
      this.toastr.success('Usuario registrado exitosamente!', 'Registrado');
      this.router.navigate(['/productos']);
    }).catch((err)=>{
      this.toastr.error('Correo ya existente!', 'Error');
      console.log(err);
    });
  }

}
