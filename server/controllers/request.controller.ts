import RequestNetwork from '@requestnetwork/request-network.js';

import * as HDWalletProvider from 'truffle-hdwallet-provider';
import * as ProviderEngine from 'web3-provider-engine';
import * as ethereumjsWallet from 'ethereumjs-wallet';
import * as WalletSubprovider from 'web3-provider-engine/subproviders/wallet';

const Web3 = require('web3');

export default class RequestCtrl {

  private web3;
  private rn;
  private infuraNodeUrl = 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO';
  private payeeIdAddress = '0x8F0255e24B99825e9AD4bb7506678F18C630453F';

  items = [
    { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
    { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
    { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 },
  ];

  constructor() {
    const mnemonic = 'butter route frozen life lizard laundry kiwi able second meadow company confirm';
    const provider = new HDWalletProvider(mnemonic, this.infuraNodeUrl);
    this.web3 = new Web3(provider.engine);
    try {
      this.rn = new RequestNetwork(provider, 4); // rinkeby testnet
    } catch (err) {
      console.error(err);
    }
  }

  signRequest = async(req, res) => {
    if (req.body && req.body.orderId) {
      if (req.body.orderId === '030890') {
        try {
          const result = await this.rn.requestEthereumService.signRequestAsPayee(
            [this.payeeIdAddress], // _payeesIdAddress[]
            [this.web3.utils.toWei('0.175', 'ether')], // _expectedAmounts[]
            new Date().getTime() + 1000 * 60 * 60 * 24, // _expirationDate (1day)
            null, // _payeesPaymentAddress[]
            JSON.stringify({ reason: `Order #${req.body.orderId} from Just Another Shop ` }), // _data
          );
          res.status(200).json(result);
        } catch (err) {
          res.status(400).send(err);
        }
      } else {
        res.status(400).send('orderId not found');
      }
    } else {
      res.status(400).send('missing orderId param');
    }
  }

  getTxDetails = async(req, res) => {
    if (req.params && req.params.txHash) {
      try {
        const result = await this.rn.requestCoreService.getRequestByTransactionHash(req.params.txHash);
        return res.status(200).json(result);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(400).send('missing txHash param');
    }
  }

  // // Get all
  // getAll = (req, res) => {
  //   this.model.find({}, (err, docs) => {
  //     if (err) { return console.error(err); }
  //     res.json(docs);
  //   });
  // }

  // // Count all
  // count = (req, res) => {
  //   this.model.count((err, count) => {
  //     if (err) { return console.error(err); }
  //     res.json(count);
  //   });
  // }

  // Insert
  // insert = (req, res) => {
  //   const obj = new this.model(req.body);
  //   obj.save((err, item) => {
  //     // 11000 is the code for duplicate key error
  //     if (err && err.code === 11000) {
  //       res.sendStatus(400);
  //     }
  //     if (err) {
  //       return console.error(err);
  //     }
  //     res.status(200).json(item);
  //   });
  // }



  // Update by id
  // update = (req, res) => {
  //   this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
  //     if (err) { return console.error(err); }
  //     res.sendStatus(200);
  //   });
  // }

}
