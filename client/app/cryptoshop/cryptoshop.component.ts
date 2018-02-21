import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

}
