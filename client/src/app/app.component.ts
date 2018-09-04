import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from './session.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SessionService ]
})


export class AppComponent {
  title = 'client';

  public session: Subscription;

  constructor(private _sessionService: SessionService) {
    this.session = this._sessionService.watchStorage().subscribe((data: string) => {
      console.log("App Component ts: ");
    });
  }
}
