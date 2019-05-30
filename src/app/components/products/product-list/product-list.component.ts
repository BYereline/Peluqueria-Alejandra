import { Component, OnInit } from '@angular/core';
 
//service
import {ProductService} from '../../../services/product.service';
import {ToastrService} from 'ngx-toastr';

//class product
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[]; 

  constructor(private productService: ProductService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x ["skey"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

    onEdit(product: Product)
    {
      this.productService.selectedProduct = Object.assign({},product);
    }

    onDelete(skey: string)
    {
      if(confirm('Estas seguro de querer eliminarlo?')){
        this.productService.deleteProduct(skey);
        this.toastr.success('ELIMINADO', 'Producto Eliminado');
      }
    } 
}
