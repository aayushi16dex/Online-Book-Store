import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-trending-books',
  templateUrl: './trending-books.component.html',
  styleUrls: ['./trending-books.component.css' ]
})
export class TrendingBooksComponent {
  bookResult: any;
  bookList: any;

  constructor(private bookService: BookService){
    this.getTrendingBooksList();
  }

  getTrendingBooksList(){
    this.bookService.getTrendingBooks().subscribe((data) => {
      this.bookResult = data;
      this.bookList = this.bookResult.result;
      console.log(this.bookList);
    });
  }

}
