import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { ChannelsService } from '../../services/channels.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-channels',
  templateUrl: './group-channels.component.html',
  styleUrls: ['./group-channels.component.css']
})
export class GroupChannelsComponent implements OnInit {

  private nonGroupchannels;
  private groups;
  private groupChannels = [];
  private channels;
  private selectedGroup;

  constructor(private groupService: GroupsService, private channelService: ChannelsService) { }

  ngOnInit() {
    this.getGroups();
    this.getChannels();
  }

  selectGroup(group) {
    this.selectedGroup = group;
    this.getChannelsInGroup(group);
  }

  getGroups() {
    this.groupService.getGroups().subscribe(
      data => { this.groups = data; },
      err => console.error(err),
      () => console.log('done loading groups')
    );
  }

  getChannels() {
    this.channelService.getChannels().subscribe(
      data => {
        this.channels = data;
      },
      err => console.error(err),
      () => console.log('done loading channels')
    );
  }

  getChannelsInGroup(group) {
    this.groupChannels = group.channels;
  }

  addChannelToGroup(channel) {
    let str: string = '';
    str = '{ "channelname": "' + channel.name + '" }';
    console.log((str));
    this.selectedGroup.channels.push(JSON.parse(str));
    console.log(this.selectedGroup);

    this.groupService.updateGroup(this.selectedGroup).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error saving group');
      }
    );
  }

  removeChannelFromGroup(channel) {
    console.log('Remove channel from group: ' + channel.channelname);
    this.selectedGroup.channels.pop(channel.channelname);
    this.groupService.updateGroup(this.selectedGroup).subscribe(
      data => {
        this.getGroups();
        return true;
      },
      error => {
        console.error('Error saving group');
      }
    );
  }

}
