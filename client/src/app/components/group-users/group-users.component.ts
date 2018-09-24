import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {

  private nonGroupusers;
  private groups;
  private groupUsers = [];
  private group;
  private users;
  private selectedGroup;

  constructor(private groupService: GroupsService, private userService: UserService) { }

  ngOnInit() {
    this.getGroups();
    this.getUsers();
  }

  selectGroup(group) {
    this.selectedGroup = group;
    this.getUsersInGroup(group);
  }

  getGroups() {
    this.groupService.getGroups().subscribe(
      data => { this.groups = data; },
      err => console.error(err),
      () => console.log('done loading groups')
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }

  getUsersInGroup(group) {
    this.groupUsers = group.users;
  }

  addUserToGroup(user) {
    console.log('Update Group in component called: ' + JSON.stringify(this.selectedGroup));

    let str: string = '';
    str = '{ "username": "' + user.name + '" }';
    console.log((str));
    this.selectedGroup.users.push(JSON.parse(str));
    console.log(this.selectedGroup);

    this.groupService.updateGroupByName(this.selectedGroup).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error saving group');
      }
    );
  }

  removeUserFromGroup(user) {
    console.log('Remove user from group: ' + user.username);
    this.selectedGroup.users.pop(user.username);
    this.groupService.updateGroupByName(this.selectedGroup).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error saving group');
      }
    );
  }




}
