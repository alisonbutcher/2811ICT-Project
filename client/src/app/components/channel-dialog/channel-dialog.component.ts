import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  _id: string;
  name: string;
  description: string;
  metaTitle: string;
}

@Component({
  selector: 'app-channel-dialog',
  templateUrl: './channel-dialog.component.html',
  styleUrls: ['./channel-dialog.component.css'],
  preserveWhitespaces: true
})
export class ChannelDialogComponent implements OnInit {


  private form: FormGroup;
  private title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { _id, name, description, metaTitle }: DialogData) {

      this.form = fb.group({
        _id: [_id],
        name: [name],
        description: [description]
    });

    this.title = metaTitle;
    }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}





