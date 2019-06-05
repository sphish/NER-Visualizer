import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './material.module';
import { InputareaComponent } from './inputarea/inputarea.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafeHtmlPipe } from './safehtml';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AppComponent,
    InputareaComponent,
    FileSelectDirective
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
