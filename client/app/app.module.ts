import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AppRoutingModule } from './app-routing.module';

import { RequestService } from './services/request.service';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomeComponent } from './home/home.component';

// import { RunKitEmbedComponent } from 'angular-runkit'


@NgModule({
  declarations: [
    // RunKitEmbedComponent,
    AppComponent,
    ShopComponent,
    ConfirmComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    NgxPageScrollModule
  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
