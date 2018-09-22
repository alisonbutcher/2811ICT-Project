import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

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
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    @Input()
    dialogData: DialogData[];

    // Which columns are visible in table
    displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

    private users;
    private title;

    // @ViewChild(MatSort) sort: MatSort;

    constructor(private _userService: UserService, private dialog: MatDialog) { }

    ngOnInit() {
        this.getUsers();
    }

    addUser() {
        const dialogData = {
            _id: '',
            name: '',
            email: '',
            role: '',
            password: '',
            metaTitle: 'Add User'
        };

        this.addEditUser(dialogData);
    }


    addEditUser({ _id, name, email, role, password, metaTitle }: DialogData) {
        if (_id !== '') {
            metaTitle = 'Update User';
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            _id, name, email, role, password, metaTitle
        };

        dialogConfig.width = '360px';

        const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {

            delete result['metaTitle'];

            // If id empty its a new user
            if (_id === '') {

                // Remove _id field for create
                delete result['_id'];

                this.createUser(result);

            } else {

                this.updateUser(result);
            }
        });
    }

    getUsers() {
        this._userService.getUsers().subscribe(
            data => {
                this.users = data;
            },
            err => console.error(err),
            () => console.log('done loading users')
        );
    }

    createUser(user) {
        console.log('In component createUser: ' + user);
        this._userService.createUser(user).subscribe(
            data => {
                this.getUsers();
                return true;
            },
            error => {
                console.error(error);
            }
        );
    }
    updateUser(user) {
        this._userService.updateUser(user).subscribe(
            data => {
                this.getUsers();
                return true;
            },
            error => {
                console.error('Error updating user');
            }
        );
    }
    deleteUser(user) {
        console.log(user);
        this._userService.deleteUser(user).subscribe(
            data => {
                this.getUsers();
                return true;
            },
            error => {
                console.error('Error deleting user');
            }
        );
    }

}
