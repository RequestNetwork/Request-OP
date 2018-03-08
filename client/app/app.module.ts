import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { RequestService } from './services/request.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
