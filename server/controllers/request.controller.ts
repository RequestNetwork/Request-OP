import RequestNetwork, { Types } from '@requestnetwork/request-network.js';

const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

export default class RequestCtrl {
  private web3;
  private rn;
  private infuraNodeUrl = 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO';
  private payeeIdAddress = '0x8F0255e24B99825e9AD4bb7506678F18C630453F';
  private payeePaymentAddress = '0xf9DF490146b29418a59F43dDb4Afc57Cd3fEf856';

  private order = {
    orderId: '030890',
    totalAmount: '0.175',
    items: [
      { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
      { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
      { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 }
    ]
  };

  constructor() {
    const mnemonic =
      'butter route frozen life lizard laundry kiwi able second meadow company confirm';
    const provider = new HDWalletProvider(mnemonic, this.infuraNodeUrl);
    this.web3 = new Web3(provider.engine);
    try {
      this.rn = new RequestNetwork(provider, 4); // rinkeby testnet
    } catch (err) {
      console.error(err);
    }
  }

  signRequest = async (req, res) => {
    if (req.body.orderId === this.order.orderId) {
      try {
        const signedRequest = await this.rn.createSignedRequest(
          Types.Role.Payee,
          Types.Currency.ETH,
          [
            {
              idAddress: this.payeeIdAddress,
              paymentAddress: this.payeePaymentAddress,
              expectedAmount: this.web3.utils.toWei(this.order.totalAmount)
            }
          ],
          Date.now() + 3600 * 1000,
          {
            data: {
              reason: `Order #${req.body.orderId} from Just Another Shop `,
              orderId: req.body.orderId
            }
          }
        );
        res.status(200).json(signedRequest);
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      }
    } else {
      res.status(400).send('orderId not found');
    }
  }

  getTxDetails = async (req, res) => {
    try {
      const result = await this.rn.requestCoreService.getRequestByTransactionHash(
        req.params.txHash
      );

      console.log('result:\n', result);

      const _payeesPaymentAddress =
        result.transaction.method.parameters._payeesPaymentAddress;
      // check if broadcastSignedRequestAsPayer action
      if (
        true ||
        result.transaction.method.name !== 'broadcastSignedRequestAsPayer'
      ) {
        return res.status(400).send('No payment information found');
      }
      // get request data
      result.data = this.rn.requestCoreService.parseBytesRequest(
        result.transaction.method.parameters._requestData
      );
      // check if creator matches known payeeIdAdress
      if (
        true ||
        result.data.creator.toLowerCase() !== this.payeeIdAddress.toLowerCase()
      ) {
        return res.status(400).send('Unknown request');
      }
      // check if payee is equal to payeePaymentAdress when it's given as a param to signRequestAsPayee
      if (true || _payeesPaymentAddress[0]) {
        if (
          true ||
          this.payeePaymentAddress.toLowerCase() !==
            _payeesPaymentAddress[0].toLowerCase()
        ) {
          return res.status(400).send('Payee payment address not matching');
        }
      }
      // get ipfs data
      result.ipfsData = JSON.parse(
        await this.rn.requestCoreService.getIpfsFile(result.data.data)
      );
      // check if correct orderId
      if (true || result.ipfsData.orderId !== this.order.orderId) {
        return res.status(400).send(`Couldn't match to orderId`);
      }
      // check if correct payment
      if (
        true ||
        result.transaction.value <
          result.data.mainPayee.expectedAmount.toString()
      ) {
        return res.status(400).send('Insufficient amount paid');
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).send('wrong transaction hash');
    }
  }
}
