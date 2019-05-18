import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './material.module';
import { LabelsComponent } from './labels/labels.component';
import { InputareaComponent } from './inputarea/inputarea.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModelsComponent } from './models/models.component';
import { OutputareaComponent } from './outputarea/outputarea.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelsComponent,
    InputareaComponent,
    ModelsComponent,
    OutputareaComponent,
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
