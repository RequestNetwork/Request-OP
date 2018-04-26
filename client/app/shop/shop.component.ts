import { Component, Inject } from '@angular/core';
import { RequestService } from '../services/request.service';
import { environment } from  '../../environments/environment'

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  items = [
    { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
    { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
    { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 }
  ];

  orderId = '030890';
  gatewayUrl = environment.gatewayUrl;
  loading = false;
  callbackUrl: string;

  constructor(@Inject(DOCUMENT) private document: any, private requestService: RequestService) {
    this.callbackUrl = `${this.document.location.origin}/#/confirm/`;
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.priceUnit * item.quantity;
    }
    return total;
  }

  payWithEth() {
    console.log('click on pay with ETH');
    this.loading = true;
    this.requestService.signRequest({ orderId: this.orderId }).subscribe(
      res => {
        if (res.signature) {
          const qs = JSON.stringify({signedRequest: res, callbackUrl: this.callbackUrl, networkId: 4});
          const qsb64 = btoa(qs)
          this.document.location.href = `${this.gatewayUrl}${qsb64}`;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
