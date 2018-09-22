import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent} from './components/login/login.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { RolesComponent } from './components/roles/roles.component';
import { ChannelUsersComponent } from './components/channel-users/channel-users.component';
import { GroupUsersComponent } from './components/group-users/group-users.component';
import { GroupChannelsComponent } from './components/group-channels/group-channels.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'groups', component: GroupsComponent },
  {path: 'login', component: LoginComponent },
  {path: 'channel', component: ChannelsComponent },
  {path: 'roles', component: RolesComponent },
  {path: 'channel-users', component: ChannelUsersComponent },
  {path: 'group-users', component: GroupUsersComponent },
  {path: 'group-channels', component: GroupChannelsComponent },
  {path: 'chat', component: ChatComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
