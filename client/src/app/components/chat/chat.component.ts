import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChannelsService } from '../../services/channels.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private selectedchannel;
  private members;
  private channel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private channelService: ChannelsService
  ) { }

  ngOnInit() {

    // subscribe to observable for url params
    this.route.paramMap.subscribe(params => {
      console.log(params.get('channelname'));
      this.selectedchannel = params.get('channelname');
      this.getChannel(this.selectedchannel);
      this.members = JSON.stringify(this.channel);
    });


  }

  getChannel(channel_name) {
    this.channelService.getChannelByName(channel_name).subscribe(
      data => {
        this.channel = data;
      },
      err => console.log(err),
      () => console.log('get selected channel')
    );
  }

}
