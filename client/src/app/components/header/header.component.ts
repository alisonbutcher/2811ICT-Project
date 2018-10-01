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
    role = '';
    user;
    constructor(public session: SessionService, private router: Router) { }

    ngOnInit() {
        // Subscribe to the observable sessionService to monitor session variables
        this.session.watchStorage().subscribe((data: string) => {

            if (this.session.getitem('role') != null) {
                this.role = this.session.getitem('role');
            }

            if (this.session.getitem('name') != null) {
                this.user = this.session.getitem('name');
            }
        });
    }

    logout() {
        this.session.removeAllItems();
        this.session.setItem('role', '');
        this.router.navigateByUrl('/login');
    }

}
