import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  roles = [
    {_id: '5b9f48492422f249f0724dfc', name: 'Super Admin'},
    {_id: '5b9f48652422f249f0724dfd', name: 'Group Admin'},
    {_id: '5b9f48792422f249f0724dfe', name: 'Chat User'}
  ];

  private name: string = null;
  private password: string = null;
  private email: string = null;

  constructor(private _userService: UserService, private form: FormsModule) { }

  ngOnInit() {

  }


  addUser(event) {
    event.preventDefault();
    // Build JSON to body
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    console.log('user data in:' + user);

    // console.log("Sending: " + user);
    this._userService.createUser(user).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        console.error('Error: ' + error);
      }
    );
  }
}
