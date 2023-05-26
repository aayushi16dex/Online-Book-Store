import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { CartComponent } from './cart.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'add/:id', component: AddItemComponent},
  { path: 'delete/:id', component: DeleteItemComponent},
  { path: 'view', component: ViewCartComponent},
  { path: 'buy-now/:id', component: BuyNowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
