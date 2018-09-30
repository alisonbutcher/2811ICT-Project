import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SessionService } from '../../services/session.service';
import { ChannelDialogComponent } from '../channel-dialog/channel-dialog.component';


export interface DialogData {
    _id: string;
    name: string;
    description: string;
    metaTitle: string;
}
@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.css'],
    preserveWhitespaces: true
})

export class ChannelsComponent implements OnInit {
    events: string[] = [];
    opened: boolean = true;
    panelOpenState = false;
    role = 0;
    channel;

    @Input()
    dialogData: DialogData[];

    // Which columns are visible in table
    displayedColumns: string[] = ['name', 'description', 'actions'];

    private channels;
    private title;

    // @ViewChild(MatSort) sort: MatSort;

    constructor(private _channelsService: ChannelsService, private dialog: MatDialog, public session: SessionService) { }

    ngOnInit() {
        this.getChannels();
    }

    addChannel() {
        const dialogData = {
            _id: '',
            name: '',
            description: '',
            metaTitle: 'Add Channel'
        };

        this.addEditChannel(dialogData);
    }


    addEditChannel({ _id, name, description, metaTitle }: DialogData) {
        if (_id !== '') {
            metaTitle = 'Update Channel';
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            _id, name, description, metaTitle
        };

        dialogConfig.width = '360px';

        const dialogRef = this.dialog.open(ChannelDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {

            // If id empty its a new channel
            if (_id === '') {

                // Remove _id field for create
                delete result['_id'];

                this.createChannel(result);

            } else {

                this.updateChannelById(result);
            }
        });
    }

    getChannels() {
        this._channelsService.getChannels().subscribe(
            data => { this.channels = data; },
            err => console.error(err),
            () => console.log('done loading channels')
        );
    }

    createChannel(channel) {
        this._channelsService.createChannel(channel).subscribe(
            data => {
                this.getChannels();
                return true;
            },
            error => {
                console.error(error);
            }
        );
    }

    updateChannelById(channel) {
        this._channelsService.updateChannelById(channel).subscribe(
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
