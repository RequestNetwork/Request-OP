import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CryptoshopComponent } from './cryptoshop/cryptoshop.component';


const routes: Routes = [
  // { pathMatch: 'full', path: '', component: CryptoshopComponent },
  { pathMatch: 'full', path: 'cryptoshop', component: CryptoshopComponent },
  { pathMatch: 'full', path: '**', redirectTo: '/cryptoshop' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
