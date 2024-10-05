import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-list-books',
    templateUrl: './list-books.component.html',
    styleUrls: ['./list-books.component.css'],
    preserveWhitespaces:true
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
    contents: any[] = [
        { id: 1, title: 'Article 1', type: 'Article' },
        { id: 2, title: 'Video 1', type: 'Video' },
        { id: 3, title: 'Article 2', type: 'Article' },
        { id: 4, title: 'Podcast 1', type: 'Podcast' },
        { id: 5, title: 'Video 2', type: 'Video' }
      ];
     filterList:any[] =[{label:'Sort By',icon:'keyboard_arrow_down'},{label:'Content Type',icon:'keyboard_arrow_down'}]
      contentTypes: string[] = ['All', 'Article', 'Video', 'Podcast'];
      selectedType: string = 'All';
    constructor(private bookService: BookService) {
        this.getBooksList();
    }

    getBooksList() {
        let payload = new Book()
        payload.pageNumber=this.currentPageNo;
        payload.categories =[];
        payload.searchTitle=this.searching
        this.bookService.getBooks(payload,resp=>{
            if(resp?.flag ===1){
                this.bookResult = resp;
                this.bookList = this.bookResult.data;
                this.booksLength = this.bookResult.length;
                // this.getCategories()
            }
           
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
        });
    }

     getPaginatorData(event: PageEvent){
        this.lowValue = event.pageIndex * event.pageSize;
        this.highValue = this.lowValue + event.pageSize;
        this.currentPageNo = event.pageIndex
        this.getBooksList()
    }

    getCategories(){
        this.bookService.getBookCategories(resp=>{
            if(resp.flag==1)
          this.contents =resp.data
            
        })
    }

    
}
