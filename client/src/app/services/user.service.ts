import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getUsers() {
    return this.http.get(environment.apiHost + '/api/user');
  }

  createUser(user) {
    const body = JSON.stringify(user);
    return this.http.post(environment.apiHost + '/api/user/', body, httpOptions);
  }
  // update currently is not being used
  updateUser(user) {
    const body = JSON.stringify(user);
    return this.http.put(environment.apiHost + '/api/user/' + user._id, body, httpOptions);
  }
  deleteUser(user) {
    return this.http.delete(environment.apiHost + '/api/user/' + user._id);
  }
}


