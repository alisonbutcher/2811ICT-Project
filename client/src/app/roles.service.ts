import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

    // Uses http.get() to load data from a single API endpoint
    getRoles() {
      return this.http.get('http://localhost:3000/api/roles');
    }

    createRole(role) {
      const body = JSON.stringify(role);
      return this.http.post('http://localhost:3000/api/roles/', body, httpOptions);
    }
    // update currently is not being used
    updateRole(role) {
      const body = JSON.stringify(role);
      console.log('Update Role Service Called ' + role);
      return this.http.put('http://localhost:3000/api/roles/' + role.id, body, httpOptions);
    }
    deleteRole(role) {
      console.log('In user service, delete user: ' + role.id);
      return this.http.delete('http://localhost:3000/api/roles/' + role.id);
    }

    getUserRole(user) {
      return this.http.get('http://localhost:3000/api/user-roles/' + user.id);
    }

}
