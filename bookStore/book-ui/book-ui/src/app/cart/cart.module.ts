import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { AddItemComponent } from './add-item/add-item.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { FormsModule } from '@angular/forms';
import { BuyNowComponent } from './buy-now/buy-now.component';


@NgModule({
  declarations: [
    CartComponent,
    AddItemComponent,
    DeleteItemComponent,
    ViewCartComponent,
    BuyNowComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule
  ]
})
export class CartModule { }
