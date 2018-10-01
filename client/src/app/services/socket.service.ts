import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private url = 'http://localhost:3000';
    private socket = null;
    private room;

    constructor() { }


    join(room) {
        this.socket.emit('changeRoom', room);
    }


    sendMessage(message) {
        this.socket.emit('sendMessage', message);
    }


    getMessages() {
        this.socket = io(this.url);

        const observable = new Observable(observer => {
            this.socket.on('UpdateChat', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
}
