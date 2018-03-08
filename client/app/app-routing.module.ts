import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  // { pathMatch: 'full', path: '', component: ShopComponent },
  { pathMatch: 'full', path: 'shop', component: ShopComponent },
  { pathMatch: 'full', path: '**', redirectTo: '/shop' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
