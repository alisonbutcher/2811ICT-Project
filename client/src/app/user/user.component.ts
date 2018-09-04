import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users;
  public username;
  public useremail;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers().subscribe(
      data => { this.users = data; },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }
  createUser(name, email) {
    let user = {
      name: name,
      email: email
    }
    console.log('log:' + user);
    this._userService.createUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error(error);
      }
    )
  }
  updateUser(user) {
    this._userService.updateUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error updating user');
      }
    );
  }
  deleteUser(user) {
    this._userService.deleteUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error deleting user');
      }
    );
  }

}
