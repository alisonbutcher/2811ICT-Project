import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

    getChannelUsers(channel) {
        return this.http.get('http://localhost:3000/api/channel-user/', channel._id);
    }

    getChannelByName(channel_name) {
        return this.http.get('http://localhost:3000/api/channel/', channel_name);
    }

    getUsersNotInChannel(channel) {
        return this.http.get('http://localhost:3000/api/channel-not-users/', channel._id);
    }

    createChannel(channel) {
        // console.log(user);
        const body = JSON.stringify(channel);
        return this.http.post('http://localhost:3000/api/channel/', body, httpOptions);
    }

    updateChannelById(channel) {
        console.log('updatechannelby id service' + JSON.stringify(channel));
        const body = JSON.stringify(channel);
        return this.http.put('http://localhost:3000/api/channel/id/' + channel._id, body, httpOptions);
    }

    updateChannel(channel) {
        console.log(JSON.stringify(channel));
        const body = JSON.stringify(channel);
        return this.http.put('http://localhost:3000/api/channel/' + channel.name, body, httpOptions);
    }

    // updateChannel(channel) {
    //   const body = JSON.stringify(channel);
    //   console.log("In Service updateChannel(): " + body);
    //   return this.http.put('http://localhost:3000/api/channel/' + channel.name, body, httpOptions);
    // }

    deleteChannel(channel) {
        return this.http.delete('http://localhost:3000/api/channel/id/' + channel._id);
    }
}
