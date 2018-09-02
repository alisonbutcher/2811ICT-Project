import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { UserComponent } from './user/user.component';
import {LoginComponent} from './login/login.component';
import { ChannelsComponent } from './channels/channels.component';
import { RolesComponent } from './roles/roles.component';
import { ChannelUsersComponent } from './channel-users/channel-users.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { GroupChannelsComponent } from './group-channels/group-channels.component';


const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'groups', component: GroupsComponent },
  {path: 'login', component: LoginComponent },
  {path: 'channel', component: ChannelsComponent },
  {path: 'roles', component: RolesComponent },
  {path: 'channel-users', component: ChannelUsersComponent },
  {path: 'group-users', component: GroupUsersComponent },
  {path: 'group-channels', component: GroupChannelsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
