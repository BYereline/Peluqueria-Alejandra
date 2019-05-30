import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/internal/observable';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class OuthService {

  constructor(
    public afAuth: AngularFireAuth
    ) { }


    registerUser (email: string, pass: string){
      return new Promise((resolve,reject)=>{
        this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
        .then(userData => resolve(userData),
        err => reject(err));
      });
    }

    loginEmail(email: string, pass: string){
      return new Promise((resolve,reject)=>{
        this.afAuth.auth.signInWithEmailAndPassword(email,pass)
        .then(userData => resolve(userData),
        err => reject(err));
      });
    }

    getAuth(){
      return this.afAuth.authState.map(auth => auth);
    }

    logout (){
      return this.afAuth.auth.signOut();
    }

}
