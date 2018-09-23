import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    events: string[] = [];
    opened: boolean = true;
    panelOpenState = false;
    role = 0;
    user;
    constructor(public session: SessionService, private router: Router) { }

    ngOnInit() {
        // Subscribe to the observable sessionService to monitor session variables
        this.session.watchStorage().subscribe((data: string) => {

            if (this.session.getitem('accessLevel') != null)  {
                this.role = Number(this.session.getitem('accessLevel'));
            }

            if (this.session.getitem('name') != null ) {
                this.user = this.session.getitem('name');
            }
            console.log('Hello ' + this.user + ', your access level is: ' + this.role);
        });
    }

    logout() {
        this.session.removeAllItems();
        this.session.setItem('accessLevel', 0);
        this.router.navigateByUrl('/');
    }

}
