import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
 
//service
import {ProductService} from '../../../services/product.service';
import {AngularFireStorage} from '@angular/fire/storage';

import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/observable';
 
//product class
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private storage : AngularFireStorage) { }

    uploadPercent: Observable <number>;
    urlImage: Observable <string>;

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm) 
  {
    if(productForm.value.skey == null)
      {
        console.log(productForm.value);
        this.productService.insertProduct(productForm.value);
        this.uploadPercent;
      }
      else
    this.productService.updateProduct(productForm.value);
    
    this.resetForm(productForm);
  }

  resetForm(productForm? : NgForm)
  {
    if(productForm != null)
    productForm.reset();
    this.productService.selectedProduct = new Product();
  }
 
  // SUBIR IMAGEN A FIRESTORAGE
  onUpload (e){
    //console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/product_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    console.log(this.uploadPercent);
     
  }

}
