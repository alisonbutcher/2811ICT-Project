import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChannelsService } from '../../services/channels.service';
import { SocketService } from '../../services/socket.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    private selectedchannel;
    private members;
    private channel;
    private username;
    private role;
    private messages = [];
    private message;
    private connection;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private channelService: ChannelsService,
        private socketServer: SocketService,
        // private session: SessionService
    ) { }

    ngOnInit() {

        if (!localStorage.getItem('name')) {
            this.router.navigateByUrl('/login');
        } else {
            this.username = localStorage.getItem('name');
        }

        // Subscribe to the observable sessionService to monitor session variables
        // this.session.watchStorage().subscribe((data: string) => {
        //     // this.username = this.session.getitem('name');
        //     // console.log('User is: ' + localStorage.getItem('name'));
        // });

        // Subscribe to the socket server observable
        this.connection = this.socketServer.getMessages().subscribe(message => {
            this.messages.push(message);
            this.message = '';
        });

        // subscribe to observable for url params
        this.route.paramMap.subscribe(params => {
            this.selectedchannel = params.get('channelname');
            this.join();
        });

        this.getChannel(this.selectedchannel);

        this.connection.on('connect', () => {
            this.connection.emit('room', this.selectedchannel);
        });
    }

    join() {
        this.socketServer.join(this.selectedchannel);
    }

    sendMessage(message) {
        // Build JSON Object
        // const jsn = '{ "username": "' + this.username + '", "channelname": "' + this.selectedchannel +
        //     '", "message": "' + this.message + '" }';
        // this.socketServer.sendMessage(JSON.parse(jsn));
        this.socketServer.sendMessage('[' + this.username + ']: ' + this.message);
    }

    getChannel(channel_name) {
        this.channelService.getChannelByName(channel_name).subscribe(
            data => {
                this.channel = data;
                console.log(JSON.stringify(this.channel));
            },
            err => console.log(err),
            () => console.log('get selected channel')
        );
    }

    getChannelHistory() {

    }


}
