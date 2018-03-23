import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ConfirmComponent } from './confirm/confirm.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { pathMatch: 'full', path: 'shop', component: ShopComponent },
  { pathMatch: 'full', path: 'confirm/:txHash', component: ConfirmComponent },
  { pathMatch: 'full', path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
