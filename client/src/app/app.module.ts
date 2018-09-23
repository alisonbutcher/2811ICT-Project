import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './components/groups/groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // to create bindings

import { HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { GroupUsersComponent } from './components/group-users/group-users.component';
import { GroupChannelsComponent } from './components/group-channels/group-channels.component';
import { ChannelUsersComponent } from './components/channel-users/channel-users.component';
import { ChatComponent } from './components/chat/chat.component';
import { SessionService } from './services/session.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChannelDialogComponent } from './components/channel-dialog/channel-dialog.component';
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


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    UserComponent,
    LoginComponent,
    ChannelsComponent,
    GroupUsersComponent,
    GroupChannelsComponent,
    ChannelUsersComponent,
    ChatComponent,
    FooterComponent,
    UserDialogComponent,
    ContentContainerComponent,
    HeaderComponent,
    SidebarComponent,
    ChannelDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatSelectModule,
    MatDialogModule


  ],
  entryComponents: [
    ChannelDialogComponent,
    UserDialogComponent
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
