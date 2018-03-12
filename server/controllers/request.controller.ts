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
            JSON.stringify({ reason: `Order #${req.body.orderId} from Just Another Shop `, orderId: req.body.orderId }), // _data
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

}
