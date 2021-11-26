import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {MatDialogModule} from '@angular/material/dialog'; 
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { Interceptor } from './config/interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { HomeComponent } from './components/global/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterdialogComponent } from './dialogs/registerdialog/registerdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthComponent,
    NavbarComponent,
    HomeComponent,
    RegisterdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: Interceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
