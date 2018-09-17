import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './components/groups/groups.component';
import { FormsModule } from '@angular/forms'; // to create bindings

import { HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { RolesComponent } from './components/roles/roles.component';
import { GroupUsersComponent } from './components/group-users/group-users.component';
import { GroupChannelsComponent } from './components/group-channels/group-channels.component';
import { ChannelUsersComponent } from './components/channel-users/channel-users.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { SessionService } from './services/session.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Angular Material Components
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatRadioGroup
} from '@angular/material';
import { FooterComponent } from './components/footer/footer.component';
import { AddUserComponent } from './components/add-user/add-user.component';
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
    ChannelUsersComponent,
    MenuComponent,
    ChatComponent,
    FooterComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatRadioModule,
    // MatMenuModule
    MatToolbarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule

  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
