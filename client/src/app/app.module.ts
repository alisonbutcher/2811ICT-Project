import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { FormsModule } from '@angular/forms'; // to create bindings

import { HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ChannelsComponent } from './channels/channels.component';
import { RolesComponent } from './roles/roles.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { GroupChannelsComponent } from './group-channels/group-channels.component';
import { ChannelUsersComponent } from './channel-users/channel-users.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    UserComponent,
    LoginComponent,
    ChannelsComponent,
    RolesComponent,
    GroupUsersComponent,
    GroupChannelsComponent,
    ChannelUsersComponent
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
