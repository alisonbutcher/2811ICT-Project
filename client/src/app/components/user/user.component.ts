import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public users;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  private username;
  private useremail;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(JSON.stringify(data));
      },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }
  createUser(name, email) {
    let user = {
      name: name,
      email: email
    };
    this._userService.createUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error(error);
      }
    );
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
    console.log(user);
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
