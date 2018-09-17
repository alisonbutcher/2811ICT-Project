import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {
  public users;
  public channels;
  public channelusers;

  constructor(private _channelsService: ChannelsService) { }

  ngOnInit() {
    this.getChannels();
  }



  getChannels() {
    this._channelsService.getChannels().subscribe(
      data => { this.channels = data; },
      err => console.error(err),
      () => console.log('done loading channels')
    );
  }

  getUsersNotInChannel(channel) {
    console.log(channel);
    this._channelsService.getUsersNotInChannel(channel).subscribe(
      data => { this.channels = data; },
      err => console.error(err),
      () => console.log('loaded users not belonging to channel')
    );
  }

  getUsersInChannel(channel) {
    console.log(channel);
    this._channelsService.getUsersInChannel(channel).subscribe(
      data => { this.channels = data; },
      err => console.error(err),
      () => console.log('loaded users belonging to channel')
    );
  }

  addUsersToChannel(channel, users) {

  }

  removeUsersFromChannel(channel, users) {

  }

  showSelected(channel) {
    alert(channel.id);
  }

  show(chan) {
    alert(chan);
  }

}
