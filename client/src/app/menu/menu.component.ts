import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../session.service';

// Observable triggered on local session data change

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role = 3;

  @Input() session: SessionService;

  constructor() { }

  ngOnInit() {

    // Subscribe to the observable sessionService to monitor session variables
    this.session.watchStorage().subscribe((data: string) => {
      this.role = Number(this.session.getitem('role'));
      console.log('Role is: ' + this.role);
    });
  }

}
