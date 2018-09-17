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

    getUsersInChannel(channel) {
      return this.http.get('http://localhost:3000/api/channel-users/', channel.id);
    }

    getUsersNotInChannel(channel) {
      return this.http.get('http://localhost:3000/api/channel-not-users/', channel.id);
    }

    createChannel(channel) {
      // console.log(user);
      const body = JSON.stringify(channel);
      return this.http.post('http://localhost:3000/api/channel/', body, httpOptions);
    }

    updateChannel(channel) {
      const body = JSON.stringify(channel);
      return this.http.put('http://localhost:3000/api/channel/' + channel.id, body, httpOptions);
    }
    deleteChannel(channel) {
      return this.http.delete('http://localhost:3000/api/channel/' + channel.id);
    }
}