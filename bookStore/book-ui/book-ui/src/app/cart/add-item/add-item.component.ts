import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  bookId: string = '';
  cart: any;
  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService, public router: Router) { }
 
  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })

    var userId: any = localStorage.getItem("email");
    console.log(userId)

    const cartBody = { 
      _id: userId, //email
      bookId: this.bookId,
    }

    this.cartService.addToCart(cartBody).subscribe(data => {
      this.cart = data;
      console.log("added")
      window.alert("Book added to cart successfully");
      this.router.navigate(["../../book"]);
    })
  }
}
