import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {

  bookId: string = '';
  book: any;
  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })

    var userId: any = localStorage.getItem("email");
    console.log(userId)

    const deleteBody = {
      _id: userId, //email
      bookId: this.bookId
    }

    if (window.confirm("Are you sure you want to delete?")) {
      this.cartService.deleteItemFromCart(deleteBody).subscribe(data => {
        this.book = data;
        console.log(this.book);
        this.router.navigate(["cart/view"]);
      })
    }
    this.router.navigate(["cart/view"]);
  }
}
