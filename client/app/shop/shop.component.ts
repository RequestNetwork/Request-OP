import { Component, Inject } from '@angular/core';
import { RequestService } from '../services/request.service';

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
    { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 },
  ];
  orderId = '030890';
  gatewayUrl = 'http://localhost:8080/#/pay-with-request';

  constructor(@Inject(DOCUMENT) private document: any, private requestService: RequestService) {
  }

  getTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.priceUnit * item.quantity;
    }
    return total;
  }

  payWithEth() {
    console.log('click on pay with ETH');
    this.requestService.signRequest({orderId: this.orderId}).subscribe(
      res => {
        if (res.signature) {
          res.callbackUrl = this.document.location.href;
          this.document.location.href = `${this.gatewayUrl}?data=${encodeURIComponent(JSON.stringify(res))}`;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}