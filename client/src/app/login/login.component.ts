import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
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
  // @input() session: SessionService;

  constructor(private router: Router, private form: FormsModule, private _loginService: LoginService,
    public _session: SessionService) { }

  ngOnInit() {
  }


  loginUser(event) {
    event.preventDefault();
    this._loginService.checkLogin(this.name).subscribe(
      data => this.userObject = data,
      err => alert('Error loging in: '),
      () => {
        if (this.userObject != null) {
          this._session.setItem('id', this.userObject.id);
          this._session.setItem('username', this.userObject.name);
          this._session.setItem('email', this.userObject.email);
          this._session.setItem('role', Number(this.userObject.role));
          if (this.userObject.role >= 3) {
            this.router.navigateByUrl('/user');
          } else if (this.userObject.role == 2){
            this.router.navigateByUrl('/groups');
          } else if (this.userObject.role == 1) {
            this.router.navigateByUrl('/chat');
          } else {
            this.router.navigateByUrl('/login');
          }

        } else {
          alert('Username not found');
        }
      }
    );
  }

  logout(event) {
    event.preventDefault();
    this._session.removeAllItems();
    this._session.setItem('role', 0);
  }
}


