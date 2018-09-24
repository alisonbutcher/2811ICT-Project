import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.component.html',
  styleUrls: ['./channel-users.component.css']
})
export class ChannelUsersComponent implements OnInit {
  private nonChannelusers;
  private channels;
  private channelUsers = [];
  private channel;
  private users;
  private selectedChannel;
  role = '';

  constructor(private _channelsService: ChannelsService, private userService: UserService, private session: SessionService) { }

  ngOnInit() {
    // Subscribe to the observable sessionService to monitor session variables
    this.session.watchStorage().subscribe((data: string) => {
      this.role = this.session.getitem('role');
      console.log(this.role);
    });
    this.getChannels();
    this.getUsers();
    console.log(this.channelUsers);
    console.log(this.channels);
  }

  selectChannel(channel) {
    this.selectedChannel = channel;
    this.getUsersInChannel(channel);
  }

  getChannels() {
    this._channelsService.getChannels().subscribe(
      data => {
        this.channels = data;
      },
      err => console.error(err),
      () => console.log('done loading channels')
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }

  getUsersInChannel(channel) {
    this.channelUsers = channel.users;
  }

  addUserToChannel(user) {
    console.log('Update Channel in component called: ' + JSON.stringify(this.selectedChannel));

    let str: string = '';
    str = '{ "username": "' + user.name + '" }';
    console.log((str));
    this.selectedChannel.users.push(JSON.parse(str));
    console.log(this.selectedChannel);

    this._channelsService.updateChannel(this.selectedChannel).subscribe(
      data => {
        this.getChannels();
        return true;
      },
      error => {
        console.error('Error saving channel');
      }
    );
  }

  removeUserFromChannel(user) {
    console.log('Remove user from channel: ' + user.username);
    this.selectedChannel.users.pop(user.username);
    this._channelsService.updateChannel(this.selectedChannel).subscribe(
      data => {
        this.getChannels();
        return true;
      },
      error => {
        console.error('Error saving channel');
      }
    );
  }

  // showSelected(channel) {
  //   alert(channel.id);
  // }

  // show(chan) {
  //   alert(chan);
  // }

}
