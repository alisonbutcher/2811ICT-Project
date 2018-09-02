import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GroupsService {
  constructor(private http: HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getGroups() {
    return this.http.get('http://localhost:3000/api/group');
  }

  createGroup(group) {
    const body = JSON.stringify(group);
    return this.http.post('http://localhost:3000/api/group/', body, httpOptions);
  }

  updateGroup(group) {
    console.log(group);
    const body = JSON.stringify(group);
    return this.http.put('http://localhost:3000/api/group/' + group.id, body, httpOptions);
  }
  deleteGroup(group) {
    return this.http.delete('http://localhost:3000/api/group/' + group.id);
  }
}


