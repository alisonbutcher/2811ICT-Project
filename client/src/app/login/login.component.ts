import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = '';
  private userObject;
  email: string = '';
  constructor(private router: Router, private form: FormsModule, private _loginService: LoginService) { }

  ngOnInit() {
  }


  loginUser(event){
    event.preventDefault();
    console.log("Calling loginservice");
    this._loginService.checkLogin(this.name).subscribe(
      data => this.userObject = data,
      err => alert(err),
      () => {
        if (this.userObject != null) {
          sessionStorage.setItem('username', this.userObject.name);
          sessionStorage.setItem('email', this.userObject.email);
          console.log("setting role specific session");


          // this.router.navigateByUrl('/channels');
        } else {
          alert('Username Incorrect');
        }
      }
    );
  }
}


