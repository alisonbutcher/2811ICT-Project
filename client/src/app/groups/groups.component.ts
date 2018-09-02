import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groups;
  public name;

  constructor(private _groupsService: GroupsService) { }

  ngOnInit() {
    this.getGroups();
  }
  getGroups() {
    this._groupsService.getGroups().subscribe(
      data => { this.groups = data; },
      err => console.error(err),
      () => console.log('done loading groups')
    );
  }
  createGroup(name, description) {
    const group = {
      name: name,
      description: description
    }
    this._groupsService.createGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error(error);
      }
    );
  }
  updateGroup(group) {
    this._groupsService.updateGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error saving group');
      }
    );
  }
  deleteGroup(group) {
    this._groupsService.deleteGroup(group).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error deleting group');
      }
    );
  }
}

