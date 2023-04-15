import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {
  bookResult: any;
  bookList: any;

  constructor(private bookService: BookService){
    this.getBooksList();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getBooksList(){
    this.bookService.getBooks().subscribe((data) => {
      this.bookResult = data;
      this.bookList = this.bookResult.result;
      console.log(this.bookList);
    });
  }

}
