import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    events: string[] = [];
    opened: boolean = true;
    panelOpenState = false;
    role = '';
    user;

    constructor(public session: SessionService, private router: Router) { }

    ngOnInit() {

        // Subscribe to the observable sessionService to monitor session variables
        this.session.watchStorage().subscribe((data: string) => {
            this.role = this.session.getitem('role');
        });
    }

    logout() {
        this.session.removeAllItems();
        this.session.setItem('role', '');
        this.router.navigateByUrl('/');
    }

}
