import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { PageEvent } from '@angular/material/paginator';

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
    lowValue: number;
    highValue: any;
    currentPageNo: number=0;
    totalNoOfRecords:number=100

    constructor(private bookService: BookService) {
        this.getBooksList();
    }

    getBooksList() {
        let payload = new Book()
        payload.page=this.currentPageNo;
        payload.categories =[];
        payload.search=this.searching
        this.bookService.getBooks(payload,resp=>{
            this.bookResult = resp;
            this.bookList = this.bookResult.data;
            this.booksLength = this.bookResult.length;
        })
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

     getPaginatorData(event: PageEvent){
        this.lowValue = event.pageIndex * event.pageSize;
        this.highValue = this.lowValue + event.pageSize;
        console.log(event,"event");
        this.currentPageNo = event.pageIndex
        this.getBooksList()
    }
}
