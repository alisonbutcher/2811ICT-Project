import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }


// Uses http.get() to load data from a single API endpoint
  checkLogin(user) {
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/user/login/', body, httpOptions);
  }
}



