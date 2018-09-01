import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

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
    return this.http.get('http://localhost:3000/api/user');
  }

  createUser(user) {
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/api/user/', body, httpOptions);
  }
  //update currently is not being used
  updateUser(user) {
    let body = JSON.stringify(user);
    return this.http.put('http://localhost:3000/api/user/' + user.name, body, httpOptions);
  }
  deleteUser(user) {
    return this.http.delete('http://localhost:3000/api/user/' + user.name);
  }
}


