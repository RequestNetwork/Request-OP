import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { RequestService } from './services/request.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
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
