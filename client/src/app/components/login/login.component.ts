import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private name: string = null;
  private password: string = null;
  private userObject;
  // @input() session: SessionService;

  constructor(private router: Router, private form: FormsModule, private _loginService: LoginService,
    public _session: SessionService) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    // Build JSON to body
    const user = {
      name: this.name,
      password: this.password
    };
    console.log(user);
    this._loginService.checkLogin(user).subscribe(
      data => this.userObject = data,
      err => alert('Error loging in: '),
      () => {
        if (this.userObject != null) {
          // If error from API alert user
          if (this.userObject.hasOwnProperty('message')) {
            alert(this.userObject.message);
          } else {

            // Set local session variables
            const access = this.userObject.accessLevel;
            this._session.setItem('id', this.userObject.id);
            this._session.setItem('name', this.userObject.name);
            this._session.setItem('accessLevel', access);

            // Routing based on access level
            if (access >= 3) {
              this.router.navigateByUrl('/user');
            } else if (access === 2) {
              this.router.navigateByUrl('/group');
            } else if (access === 1) {
              this.router.navigateByUrl('/chat');
            }
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


