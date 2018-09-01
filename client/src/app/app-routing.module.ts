import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { UserComponent } from './user/user.component';
import {LoginComponent} from './login/login.component';
import { ChannelsComponent } from './channels/channels.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'groups', component: GroupsComponent },
  {path: 'login', component: LoginComponent },
  {path: 'channel', component: ChannelsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
