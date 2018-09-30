import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() { }


    sendMessage(message) {
        console.log('send Message');
        this.socket.emit('add-message', message);
    }

    getMessages() {
        console.log('get message');
        this.socket = io(this.url);
        const observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                console.log('received message from Websocket server');
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
}
