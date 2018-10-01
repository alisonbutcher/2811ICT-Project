import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChannelsService } from '../../services/channels.service';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    preserveWhitespaces: true
})


export class ChatComponent implements OnInit, AfterViewInit {

    @ViewChildren('msgList') msgList: QueryList<any>;
    @ViewChild('chatContent') chatContent: ElementRef;

    private selectedchannel;
    private members;
    private channel;
    private username;
    private role;
    private messages;
    private message;
    private connection;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private channelService: ChannelsService,
        private socketServer: SocketService

    ) { }

    ngAfterViewInit() {
        // Make sure msg list scrolls to the bottom
        this.msgList.changes.subscribe(this.scrollToBottom);
    }


    ngOnInit() {


        // Local Storage is user logged in
        if (!localStorage.getItem('name')) {
            this.router.navigateByUrl('/login');
        } else {
            this.username = localStorage.getItem('name');
        }


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

    }


    scrollToBottom = () => {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    }


    join() {
        this.socketServer.join(this.selectedchannel);
        this.messages = [];
    }


    sendMessage(message) {

        // Build message into JSON
        const msg = JSON.parse('{ "channelname": "' + this.selectedchannel + '", "username": "' +
            this.username + '", "msg": "' + message + '" }');

        this.socketServer.sendMessage(msg);
    }


    getChannel(channel_name) {
        this.channelService.getChannelByName(channel_name).subscribe(
            data => {
                this.channel = data;
            },
            err => console.log(err),
            () => { }
        );
    }

}
