import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';
// import { Subscription } from 'rxjs/Subscription';

const serverPath = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ]
})


export class AppComponent {
  title = 'client';

  // public session: Subscription;

  // constructor(private _sessionService: SessionService) {
  //   this.session = this._sessionService.watchStorage().subscribe((data: string) => {
  //     console.log("App Component ts: ");
  //   });
  // }

  constructor(public session: SessionService) {}
}
