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
      ];
     filterList:any[] =[{label:'Sort By',icon:'keyboard_arrow_down'},{label:'Content Type',icon:'keyboard_arrow_down'}]
      contentTypes: string[] = ['All', 'Article', 'Video', 'Podcast'];
      selectedType: string = 'All';
    selectedFilter: number;
    showFilterList: boolean;
    constructor(private bookService: BookService) {
        this.getBooksList();
    }

    getBooksList() {
        let payload = new Book()
        payload.pageNumber=this.currentPageNo;
        payload.categories =[];
        payload.searchTitle=this.searching
        payload.recordsPerPage = this.highValue
        this.bookService.getBooks(payload,resp=>{
            if(resp?.flag ===1){
                this.bookResult = resp;
                this.bookList = this.bookResult.data;
                this.booksLength = this.bookResult.length;
                this.getCategories()
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
        this.highValue =  event.pageSize;
        this.currentPageNo = event.pageIndex
        this.getBooksList()
    }

    getCategories(){
        this.bookService.getBookCategories(resp=>{
            if(resp.flag==1)
          this.contents =resp.data
        })
    }
    getFilterData(idx:number){
        this.selectedFilter = idx
        if(idx==1)
        this.showFilterList = !this.showFilterList
    }

    checkBoxClicked(evt:any){
     this.contents.forEach(item=>{
        item['checked'] = evt.checked
     })
     console.log(this.contents);
     
    } 
}
