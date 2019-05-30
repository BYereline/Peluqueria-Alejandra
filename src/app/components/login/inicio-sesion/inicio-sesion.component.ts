import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import {OuthService} from '../../../services/outh.service';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private authService: OuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email, this.password)
    .then((res)=>{
      this.toastr.success('Se inicio sesion exitosamente!', 'Logeado');
      this.router.navigate(['/productos']);
    }).catch((err)=>{
      this.toastr.error('Usuario no existente!', 'Error');
      console.log(err);
      this.router.navigate(['/registro']);
    });
  }
}
