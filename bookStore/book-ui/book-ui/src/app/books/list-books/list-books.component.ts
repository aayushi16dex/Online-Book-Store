import { Component } from '@angular/core';
import { BookService } from '../../services/book.service'
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-list-books',
	templateUrl: './list-books.component.html',
	styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {

	// Getting all books
	bookResult: any;
	bookList: any;
	subTotal: number;

	constructor(private bookService: BookService) {
		this.getBooksList();
	}

	getBooksList() {
		this.bookService.getBooks().subscribe((data) => {
			this.bookResult = data;
			this.bookList = this.bookResult.result;
			console.log(this.bookList);
		});
	}

	// Searching a book
	searching: string = "";
	searchResult: any;
	result: any;
	searchBook(formValue: NgForm) {
		const FormValue = formValue.value;
		this.searching = FormValue.searching,
		console.log(this.searching);
		this.bookService.searchBook(this.searching).subscribe(data => {
			this.searchResult = data;
			this.bookList = this.searchResult.result;
			console.log(this.bookList);
		})
		// 	console.log(formValue.value);
		// this.bookService.viewBook(this.searching).subscribe(data => {
		// 	this.book = data;
		// 	console.log(this.book)
		// 	this.bookDetails = this.book.result;
		// })
		// console.log(formValue.value);
		// const email = formValue.value.email;
		// const pass = formValue.value.password;
		// console.log("Email:" + email)

		// this.userService.login(this.email).subscribe(data => {
		// 	this.data = data;
		// 	console.log(this.data)

		// 	if (email === "admin@gmail.com" && pass === "admin") {
		// 		this.displayName = "Admin";
		// 		window.alert("Admin Login successful");
		// 		formValue.reset();
		// 		this.router.navigate(['/book/admin']);
		// 	}

		// 	else if (this.data.result === null) {
		// 		console.log("User does not exist")
		// 		window.alert("User does not exist. Try to sign up.");
		// 		formValue.reset();
		// 	}

		// 	else if (email === this.data.result.email && pass === this.data.result.password) {
		// 		this.profileName = this.data.result.firstName;
		// 		this.userId = this.data.result.email;
		// 		console.log("userId", this.userId);
		// 		this.displayName = this.data.result.firstName;

		// 		localStorage.setItem("name", this.profileName);
		// 		localStorage.setItem("email", this.userId);
		// 		// window.alert("Login successful");
		// 		this.router.navigate(['/book']);
		// 		formValue.reset();
		// 	}
		// 	else {
		// 		console.log("Wrong password")
		// 		window.alert("Wrong password");
		// 		formValue.reset();
		// 	}
		// })
	}

}
