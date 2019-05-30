import { Component, OnInit } from '@angular/core';
import {OuthService} from './services/outh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'peluqueria';
  private isLogin: boolean;
  private nombreUser: string;
  private email: string;

  constructor(private authService: OuthService){
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLogin = true;
        this.nombreUser = auth.displayName;
        this.email = auth.email;
      }else{
        this.isLogin = false;
      }
    });
    
  }

  onClickLogout(){
    this.authService.logout();
  }
}
