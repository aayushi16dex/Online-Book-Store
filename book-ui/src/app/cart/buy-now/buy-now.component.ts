import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
    selector: 'app-buy-now',
    templateUrl: './buy-now.component.html',
    styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent {
    bookId: string = '';
    bookDetails: any;
    book: any;
    subTotal: number = 0;
    total: number;
    shipping: number = 40;
    billing: boolean = false;
    userId: string | null;

    constructor(
        private bookService: BookService,
        private activatedRoute: ActivatedRoute,
        public router: Router
    ) {}

    currDate: Date = new Date();
    userName: string | null = localStorage.getItem('name');
    address: string = '';

    ngOnInit() {
        this.userId = localStorage.getItem('email');
        this.activatedRoute.params.subscribe((data) => {
            this.bookId = data['id'];
            console.log(this.bookId);
        });

        this.bookService.viewBook(this.bookId).subscribe((data) => {
            this.book = data;
            console.log(this.book);
            this.bookDetails = this.book.data;
            this.subTotal = this.bookDetails.listPrice;
            this.total = this.subTotal + this.shipping;
            console.log('sub: ' + this.subTotal);
        });
    }

    check() {
        this.billing = true;
        // this.cartService.deleteCart(this.userId).subscribe(data =>{
        //   this.cartDeletion = data;
        //   console.log("Successful", this.cartDeletion);

        // })
        // this.billing = true;
    }

    onPrint() {
        window.print();
    }
}
