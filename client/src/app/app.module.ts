import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { FormsModule } from "@angular/forms";

import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    LoginComponent,
    UserComponent,
    ChannelsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	  FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
