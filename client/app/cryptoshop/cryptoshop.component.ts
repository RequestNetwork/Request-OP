import { Component, Inject, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-cryptoshop',
  templateUrl: './cryptoshop.component.html',
  styleUrls: ['./cryptoshop.component.scss']
})
export class CryptoshopComponent implements OnInit {
  items = [
    { desc: 'Laszlo Pizza ', priceUnit: 0.1, quantity: 3, priceTotal: 0.3 },
    { desc: 'REQ & Morty Figurine', priceUnit: 0.25, quantity: 1, priceTotal: 0.25 },
    { desc: 'Get Req or die tryin’ Blu-ray', priceUnit: 0.002, quantity: 1, priceTotal: 0.002 },
    { desc: 'Mastering Req book', priceUnit: 0.1, quantity: 1, priceTotal: 0.1 }
  ];
  orderId = '030890';
  gatewayUrl = 'http://localhost:8080/#/pay-with-request';

  constructor(@Inject(DOCUMENT) private document: any, private requestService: RequestService) {

  }

  ngOnInit() {}

  payWithEth() {
    console.log('click on pay with ETH');
    this.requestService.signRequest({orderId: this.orderId}).subscribe(
      res => {
        console.log(res);
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
