import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { MatSidenav} from '@angular/material/sidenav';
 
// Observable triggered on local session data change

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  panelOpenState = false;
  role = 0;
  user;

  constructor(public session: SessionService, private router: Router) { }

  ngOnInit() {

    // Subscribe to the observable sessionService to monitor session variables
    this.session.watchStorage().subscribe((data: string) => {
      this.role = Number(this.session.getitem('accessLevel'));
      this.user = this.session.getitem('name');
      console.log('Hello ' + this.user + ', your access level is: ' + this.role);
    });
  }

  logout() {
    this.session.removeAllItems();
    this.session.setItem('accessLevel', 0);
    this.router.navigateByUrl('/');
  }

}
