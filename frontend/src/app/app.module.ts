import { BrowserModule } from '@angular/browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppPageComponent } from './app.component';
import { PublicApiService } from './services/public-api.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule from @angular/common/http
@import(NgModule({
  declarations: [
    AppPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PublicApiService],
  bootstrap: [AppPageComponent]
})
export class AppModule { }
