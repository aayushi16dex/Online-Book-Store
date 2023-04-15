import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
}) 
export class CartService {

  constructor(private httpClient: HttpClient) { }
 
  registerCart(body: any){
    let url = environment.CART_BASE_URL + environment.CART.REG_CART;
    console.log("API call: ", url);
    console.log("Service Body", body)
    return this.httpClient.post(url,body);
  }

  viewCart(id: string){
    let url = environment.CART_BASE_URL + environment.CART.VIEW_CART + id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  deleteItemFromCart(body:any){
    let url = environment.CART_BASE_URL + environment.CART.DELETE_ITEM;
    console.log("API call: ", url);
    console.log("Service Body", body)
    return this.httpClient.put(url,body);
  }

  deleteCart(body:any){
    let url = environment.CART_BASE_URL + environment.CART.DELETE_CART;
    console.log("API call: ", url);
    console.log("Service Body", body)
    return this.httpClient.put(url,body);
  }

  addToCart(body: any){
    let url = environment.CART_BASE_URL + environment.CART.ADD_TO_CART;
    console.log("API call: ", url);
    console.log("Service Body", body)
    return this.httpClient.put(url,body);
  }
 
//   items: Book[] = [];
// /* . . . */

  // addToCart(id: string) {
  //   let url = environment.CART_BASE_URL + environment.CART.ADD_TO_CART;
  //   console.log("API call: ", url);
  //   console.log("ServiceBody", body)
  //   return this.httpClient.post(url,body);
  // }

  // getItems() {
  //   return this.items;
  // }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }
}
