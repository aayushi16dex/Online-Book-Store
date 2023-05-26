import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent implements OnInit  {

	constructor(private userService: UserService, private cartService: CartService, public router: Router, private modalService: NgbModal, config: NgbModalConfig) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	displayName: string | null;
	ngOnInit(){
		this.displayName = localStorage.getItem("name");
		console.log("display name: " + this.displayName);
	}

	/************ modal ***************/
	openSignIn(login: any) {
		this.modalService.open(login);
	}
	openSignUp(register: any) {
		this.modalService.open(register);
	}

	/************ login ***************/
	email: string = "";
	password: string = "";
	data: any;
	profileName: string = "";
	userId: string = "";

	signIn(formValue: NgForm) {
		console.log(formValue.value);
		const email = formValue.value.email;
		const pass = formValue.value.password;
		console.log("Email:" + email)

		this.userService.login(this.email).subscribe(data => {
			this.data = data;
			console.log(this.data)

			if (email === "admin@gmail.com" && pass === "admin") {
				this.displayName = "Admin";
				window.alert("Admin Login successful");
				formValue.reset();
				this.router.navigate(['/book/admin']);
			}

			else if (this.data.result === null) {
				console.log("User does not exist")
				window.alert("User does not exist. Try to sign up.");
				formValue.reset();
			}

			else if (email === this.data.result.email && pass === this.data.result.password) {
				this.profileName = this.data.result.firstName;
				this.userId = this.data.result.email;
				console.log("userId", this.userId);
				this.displayName = this.data.result.firstName;

				localStorage.setItem("name", this.profileName);
				localStorage.setItem("email", this.userId);
				// window.alert("Login successful");
				this.router.navigate(['/book']);
				formValue.reset();
			}
			else {
				console.log("Wrong password")
				window.alert("Wrong password");
				formValue.reset();
			}
		})
	}

	/************ Register ***************/

	firstName: string = "";
	lastName: string = "";
	registerResponse: any = "";
	msg: any = "";

 
	addUser(formValue: NgForm) {
		// adding empty cart for new user in cart collection
		const postCartBody = {
			_id: formValue.value.email,
			cart: []
		}

		this.cartService.registerCart(postCartBody).subscribe(data => {
			console.log(data);
		})

		// adding new user to users collection
		const postBody = {
			firstName: formValue.value.firstName,
			lastName: formValue.value.lastName,
			email: formValue.value.email,
			password: formValue.value.password
		}
		this.userService.addUser(postBody).subscribe(data => {
			console.log(data);
			this.registerResponse = data;
			this.msg = this.registerResponse.message;
			console.log(this.msg);

			if (this.msg === "User already exists") {
				alert("You are already registered. Try to sign in.")
				formValue.reset();
			}
			else if (this.msg === "Added successfully") {
				this.profileName = this.registerResponse.userDetail.firstName;
				this.userId = this.registerResponse.userDetail.email;
				this.displayName = this.profileName;

				console.log("userId: " + this.userId);
				console.log("profile name: " + this.profileName);

				localStorage.setItem("name", this.profileName);
				localStorage.setItem("email", this.userId);

				alert("You're successfully registered. Welcome to BookClub.")
				this.router.navigate(['/book']);
				formValue.reset();

			}
			else {
				alert("Some error occured.")
				formValue.reset();
			}
		}, (err) => {
			console.log("Unable to add", err)
			alert("Exception")
		})
	}
	
	/************** Sign Out ************** */
	signingOut() {
		if (window.confirm("Are you sure you want to log out?")) {
		this.displayName = null;
		localStorage.clear();
		this.router.navigate(['/home']);
		}
	}
}
