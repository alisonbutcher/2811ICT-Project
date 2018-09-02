import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  private roles;

  constructor(private _rolesService: RolesService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this._rolesService.getRoles().subscribe(
      data => { this.roles = data; },
      err => console.error(err),
      () => console.log('done loading roles')
    );
  }
  createRole(name, description) {
    let role = {
      name: name,
      description: description
    }
    console.log('log:' + role);
    this._rolesService.createRole(role).subscribe(
      data => {
        this.getRoles();
        return true;
      },
      error => {
        console.error(error);
      }
    )
  }
  updateRole(role) {
    this._rolesService.updateRole(role).subscribe(
      data => {
        this.getRoles();
        return true;
      },
      error => {
        console.error('Error updating role');
      }
    );
  }
  deleteRole(role) {
    this._rolesService.deleteRole(role).subscribe(
      data => {
        this.getRoles();
        return true;
      },
      error => {
        console.error('Error deleting role');
      }
    );
  }


}
