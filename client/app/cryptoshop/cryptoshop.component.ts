import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

import RequestNetwork from '@requestnetwork/request-network.js';
import Web3 from 'web3';

import * as HDWalletProvider from 'truffle-hdwallet-provider';



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

  rn;
  web3: Web3;
  infuraNodeUrl = 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO';

  constructor(private requestService: RequestService) {
    const mnemonic = 'butter route frozen life lizard laundry kiwi able second meadow company confirm';
    // const privateKey = '245ad7993e697134e57a1c6a02661ea13ca3264ce4675b2108b9831224c06101';
    // const privateKeyBuffer = new Buffer(privateKey, 'hex');
    // const engine = new ProviderEngine();

    const provider = new HDWalletProvider(mnemonic, this.infuraNodeUrl);

    // engine.addProvider(new WalletSubprovider(provider));
    // engine.start();

    this.web3 = new Web3();

  }

  async ngOnInit() {
    // this.rn = new RequestNetwork(this.web3.currentProvider, 4);
    console.log('test');
    await this.web3.eth.getAccounts(console.log);
    console.log('alwight');
  }



  async payWithEth() {
    console.log('I want to pay with ETH');
    await this.web3.eth.getAccounts(console.log);



    // this.requestService.signRequest(this.items).subscribe(
    //   res => {
    //     // this.router.navigate(['']);
    //   },
    //   error => {
    //     // do something
    //   }
    // );
  }

}
