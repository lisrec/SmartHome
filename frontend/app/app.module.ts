import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { Sha256 }        from './functions/sha256';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
  					BrowserModule,
  					FormsModule
  				],

  declarations: [
  					AppComponent
  				],

  bootstrap:    [
  					AppComponent
  				],
  providers:  [
                Sha256
              ]
})
export class AppModule { }
