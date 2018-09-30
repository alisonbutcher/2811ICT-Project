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


    // join(room) {
    //     // console.log('joining room: ' + room);
    //     // if (this.socket != null) {
    //     //     this.socket.disconnect();
    //     // } else {

    //     // }
    //     // this.socket = io(this.url);

    //     // this.socket.on('connect', () => {
    //         // // this.socket.leave(this.room);
    //         // this.socket.join(room);
    //         this.socket.emit('room', room);
    //         this.room = room;
    //     // });
    // }

    join(room) {
        this.socket.emit('changeRoom', room);
    }

    sendMessage(message) {
        this.socket.emit('sendMessage', message);
    }

    getMessages() {
        // console.log('get message');
        this.socket = io(this.url);
        // this.join(this.room);
        // this.socket.connect();
        const observable = new Observable(observer => {
            this.socket.on('updateChat', (data) => {
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
