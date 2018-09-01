import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) { }

    // Uses http.get() to load data from a single API endpoint
    getChannels() {
      return this.http.get('http://localhost:3000/api/channel');
    }
  
    createChannel(channel) {
      // console.log(user);
      let body = JSON.stringify(channel);
      return this.http.post('http://localhost:3000/api/channel/', body, httpOptions);
    }
    // update currently is not being used
    updateChannel(channel) {
      let body = JSON.stringify(channel);
      return this.http.put('http://localhost:3000/api/channel/' + channel.name, body, httpOptions);
    }
    deleteChannel(channel) {
      return this.http.delete('http://localhost:3000/api/channel/' + channel.name);
    }
}