import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// TODO: move into a models file
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
}

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

    form: FormGroup;

    // roles = [
    //     { _id: '5b9f48492422f249f0724dfc', name: 'Super Admin' },
    //     { _id: '5b9f48652422f249f0724dfd', name: 'Group Admin' },
    //     { _id: '5b9f48792422f249f0724dfe', name: 'Chat User' }
    // ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { _id, name, email, role, password }: User) {

            this.form = fb.group({
                _id: [_id],
                name: [name, Validators.required],
                email: [email, Validators.required],
                role: [role, Validators.required],
                password: [password]
            });
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
