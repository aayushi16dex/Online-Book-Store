import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent {
  userId: any = '';
  cartDetails: any;
  book: any;
  subTotal: number = 0;
  total: number;
  shipping: number = 40;
  itemCount: number = 0;
  billing: boolean = false;

  constructor(private cartService: CartService) { }

  currDate: Date = new Date();
  userName: string | null = localStorage.getItem("name");
  address: string = "";

  ngOnInit() {
    this.userId = localStorage.getItem("email");

    this.cartService.viewCart(this.userId).subscribe(data => {
      this.book = data;
      console.log(this.book)
      this.cartDetails = this.book.result[0].cartInfo;
      console.log(this.cartDetails);
      this.itemCount = this.cartDetails.length
      console.log("cart items length: " , this.itemCount);

      for (let i = 0; i < this.cartDetails.length; i++) {
        this.subTotal += this.cartDetails[i].Price
        console.log(this.cartDetails[i].Price);
      }
      this.total = this.subTotal + this.shipping;

    })
  }

  check(){
    this.billing = true;
  }

  onPrint() {
    window.print();
}
}
