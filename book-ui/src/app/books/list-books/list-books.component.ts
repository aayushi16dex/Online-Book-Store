import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-list-books',
    templateUrl: './list-books.component.html',
    styleUrls: ['./list-books.component.css'],
})
export class ListBooksComponent {
    // Getting all books
    bookResult: any;
    bookList: any;
    subTotal: number;
    booksLength: number;

    constructor(private bookService: BookService) {
        this.getBooksList();
    }

    getBooksList() {
        this.bookService.getBooks().subscribe((response) => {
            this.bookResult = response;
            this.bookList = this.bookResult.data;
            this.booksLength = this.bookResult.length;
        });
    }

    // Searching a book
    searching: string = '';
    searchResult: any;
    result: any;
    searchBook(formValue: NgForm) {
        const FormValue = formValue.value;
        (this.searching = FormValue.searching), console.log(this.searching);
        this.bookService.searchBook(this.searching).subscribe((data) => {
            this.searchResult = data;
            this.bookList = this.searchResult.result;
            console.log(this.bookList);
        });
    }
}
