import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// TODO: move into a models file
export interface DialogData {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    metaTitle: string;
}

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.css'],
    preserveWhitespaces: true
})
export class UserDialogComponent implements OnInit {

    private form: FormGroup;
    private title: string;

    roles = [
        { name: 'Super Admin' },
        { name: 'Group Admin' },
        { name: 'Chat User' }
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { _id, name, email, role, password, metaTitle }: DialogData) {

            this.form = fb.group({
                _id: [_id],
                name: [name, Validators.required],
                email: [email, Validators.required],
                role: [role, Validators.required],
                password: [password]
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
