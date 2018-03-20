import RequestNetwork from '@requestnetwork/request-network.js';

import * as HDWalletProvider from 'truffle-hdwallet-provider';

import Web3 = require('web3');

export default class RequestCtrl {

  private web3;
  private rn;
  private infuraNodeUrl = 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO';
  private payeeIdAddress = '0x8F0255e24B99825e9AD4bb7506678F18C630453F';

  private order = {
    orderId: '030890',
    totalAmount: '0.175',
    items: [
      { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
      { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
      { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 },
    ],
  };


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
    if (req.body.orderId === this.order.orderId) {
      try {
        const result = await this.rn.requestEthereumService.signRequestAsPayee(
          [this.payeeIdAddress], // _payeesIdAddress[]
          [this.web3.utils.toWei(this.order.totalAmount, 'ether')], // _expectedAmounts[]
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
  }


  getTxDetails = async(req, res) => {
    try {
      const result = await this.rn.requestCoreService.getRequestByTransactionHash(req.params.txHash);
      // check if broadcastSignedRequestAsPayer action
      if (result.transaction.method.name !== 'broadcastSignedRequestAsPayer') { return res.status(400).send('No payment information found'); }
      // get request data
      result.data = this.rn.requestCoreService.parseBytesRequest(result.transaction.method.parameters._requestData);
      // check if creator matches known payeeIdAdress
      if (result.data.creator.toLowerCase() !== this.payeeIdAddress.toLowerCase()) { return res.status(400).send('Unknown request'); }
      // get ipfs data
      result.ipfsData = JSON.parse(await this.rn.requestCoreService.getIpfsFile(result.data.data));
      // check if correct orderId
      if (result.ipfsData.orderId !== this.order.orderId) { return res.status(400).send('Couldn\'t match to orderId'); }
      // check if correct payment
      if (result.transaction.value < result.data.mainPayee.expectedAmount.toString()) { return res.status(400).send('Insufficient amount paid'); }
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).send('wrong transaction hash');
    }
  }

}
