import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = '';
  private userObject;
  email: string = '';
  @input() session: SessionService;

  constructor(private router: Router, private form: FormsModule, private _loginService: LoginService) { }

  ngOnInit() {
  }


  loginUser(event) {
    event.preventDefault();
    this._loginService.checkLogin(this.name).subscribe(
      data => this.userObject = data,
      err => alert('Error loging in: '),
      () => {
        if (this.userObject != null) {
          // sessionStorage.setItem('id', this.userObject.id);
          // sessionStorage.setItem('username', this.userObject.name);
          // sessionStorage.setItem('email', this.userObject.email);
          // sessionStorage.setItem('role', this.userObject.role);
          // use the session service to store this sessionstorage item
          this.session.setItem('username', this.userObject.id);
          this.session.setItem('username', this.userObject.name);
          this.session.setItem('email', this.userObject.email);
          this.session.setItem('role', Number(this.userObject.role));

          this.router.navigateByUrl('/chat');
        } else {
          alert('Username not found');
        }
      }
    );
  }

  logout(event) {
    event.preventDefault();
    this.session.removeAllItems();
    this.session.setItem('role', 0);
  }
}


