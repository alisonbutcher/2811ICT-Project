import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ChannelsService } from '../../services/channels.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
    private groups;
    private channels;

    constructor(
        private channelService: ChannelsService,
        private groupService: GroupsService,
        private router: Router) { }

    ngOnInit() {
        this.getGroups();
        this.getChannels();
    }

    getGroups() {
        this.groupService.getGroups().subscribe(
            data => { this.groups = data; },
            err => console.error(err),
            () => {}
        );
    }

    getChannels() {
        this.channelService.getChannels().subscribe(
            data => {
                this.channels = data;
            },
            err => console.error(err),
            () => {}
        );
    }

    goToChatRoom(channelname: string) {
        this.router.navigate(['/chat/', channelname]);
    }

}
