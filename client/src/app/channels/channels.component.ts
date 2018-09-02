import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../channels.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  public channels;
  public channelName;

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

  createChannel(name, description) {
    const channel = {
      name: name,
      description: description
    }
    console.log('log:' + channel);
    this._channelsService.createChannel(channel).subscribe(
      data => {
        this.getChannels();
        return true;
      },
      error => {
        console.error(error);
      }
    )
  }

  updateChannel(channel) {
    console.log('Update Channel in component called: ' + channel);
    this._channelsService.updateChannel(channel).subscribe(
      data => {
        this.getChannels();
        return true;
      },
      error => {
        console.error('Error saving channel');
      }
    );
  }


  deleteChannel(channel) {
    this._channelsService.deleteChannel(channel).subscribe(
      data => {
        this.getChannels();
        return true;
      },
      error => {
        console.error('Error deleting channel');
      }
    );
  }


}
