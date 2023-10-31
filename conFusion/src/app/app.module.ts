import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseURL';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    DishdetailComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule, MatDialogModule,//matDialogModule it to create a popup of login i use it in the header it simple code 
    AppRoutingModule,MatListModule,MatGridListModule,MatCardModule,MatToolbarModule,MatButtonModule,BrowserAnimationsModule,FormsModule,

    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,MatSelectModule,
    MatSlideToggleModule, ReactiveFormsModule,MatProgressSpinnerModule,MatSliderModule,HttpClientModule
  ],
  providers: [ {provide: 'baseURL', useValue: baseURL}],
  bootstrap: [AppComponent,LoginComponent]//loginComponnt i added it when the application run it loaded in the DOM before angular 9 (ivy) where you use the entryComponent:LoginComponent to make the same thing
})
export class AppModule { }
