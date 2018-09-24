import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GroupsService } from '../../services/groups.service';

import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SessionService } from '../../services/session.service';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';


export interface DialogData {
  _id: string;
  name: string;
  description: string;
  metaTitle: string;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  preserveWhitespaces: true
})

export class GroupsComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  panelOpenState = false;
  role = 0;
  group;

  @Input()
  dialogData: DialogData[];

  // Which columns are visible in table
  displayedColumns: string[] = ['name', 'description', 'actions'];

  private groups;
  private title;

  constructor(private _groupsService: GroupsService, private dialog: MatDialog, public session: SessionService) { }

  ngOnInit() {
    this.getGroups();
  }

  addGroup() {
    const dialogData = {
      _id: '',
      name: '',
      description: '',
      metaTitle: 'Add Group'
    };

    this.addEditGroup(dialogData);
  }

  addEditGroup({ _id, name, description, metaTitle }: DialogData) {
    if (_id !== '') {
      metaTitle = 'Update Group';
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      _id, name, description, metaTitle
    };

    dialogConfig.width = '360px';

    const dialogRef = this.dialog.open(GroupDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      // If id empty its a new channel
      if (_id === '') {

        // Remove _id field for create
        delete result['_id'];

        this.createGroup(result);

      } else {

        this.updateGroup(result);
      }
    });
  }

  getGroups() {
    this._groupsService.getGroups().subscribe(
      data => { this.groups = data; },
      err => console.error(err),
      () => console.log('done loading groups')
    );
  }
  createGroup(group) {
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
    console.log('calling update group' + JSON.stringify(group));
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

