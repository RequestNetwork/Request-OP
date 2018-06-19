"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_network_js_1 = require("@requestnetwork/request-network.js");
var HDWalletProvider = require('truffle-hdwallet-provider');
var Web3 = require('web3');
var RequestCtrl = /** @class */ (function () {
    function RequestCtrl() {
        var _this = this;
        this.infuraNodeUrl = 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO';
        this.payeeIdAddress = '0x8F0255e24B99825e9AD4bb7506678F18C630453F';
        this.payeePaymentAddress = '0xf9DF490146b29418a59F43dDb4Afc57Cd3fEf856';
        this.order = {
            orderId: '030890',
            totalAmount: '0.175',
            items: [
                { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
                { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
                { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 }
            ]
        };
        this.signRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var signedRequest, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.orderId === this.order.orderId)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.rn.createSignedRequest(request_network_js_1.Types.Role.Payee, request_network_js_1.Types.Currency.ETH, [
                                {
                                    idAddress: this.payeeIdAddress,
                                    paymentAddress: this.payeePaymentAddress,
                                    expectedAmount: this.web3.utils.toWei(this.order.totalAmount)
                                }
                            ], Date.now() + 3600 * 1000, {
                                data: {
                                    reason: "Order #" + req.body.orderId + " from Just Another Shop ",
                                    orderId: req.body.orderId
                                }
                            })];
                    case 2:
                        signedRequest = _a.sent();
                        res.status(200).json(signedRequest);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        res.status(400).send(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(400).send('orderId not found');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getTxDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var result, _payeesPaymentAddress, _a, _b, _c, err_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.rn.requestCoreService.getRequestByTransactionHash(req.params.txHash)];
                    case 1:
                        result = _d.sent();
                        // check if broadcastSignedRequestAsPayer action
                        if (![
                            'broadcastSignedRequestAsPayerAction',
                            'broadcastSignedRequestAsPayer'
                        ].includes(result.transaction.method.name)) {
                            return [2 /*return*/, res.status(400).send('No payment information found')];
                        }
                        // get request data
                        result.data = this.rn.requestCoreService.parseBytesRequest(result.transaction.method.parameters._requestData);
                        // check if creator matches known payeeIdAddress
                        if (result.data.creator.toLowerCase() !== this.payeeIdAddress.toLowerCase()) {
                            return [2 /*return*/, res.status(400).send('Unknown request')];
                        }
                        _payeesPaymentAddress = result.transaction.method.parameters._payeesPaymentAddress;
                        // check if payee is equal to payeePaymentAdress when it's given as a param to signRequestAsPayee
                        if (_payeesPaymentAddress[0]) {
                            if (this.payeePaymentAddress.toLowerCase() !==
                                _payeesPaymentAddress[0].toLowerCase()) {
                                return [2 /*return*/, res.status(400).send('Payee payment address not matching')];
                            }
                        }
                        // get ipfs data
                        _a = result;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, this.rn.requestCoreService.getIpfsFile(result.data.data)];
                    case 2:
                        // get ipfs data
                        _a.ipfsData = _c.apply(_b, [_d.sent()]);
                        // check if correct orderId
                        if (result.ipfsData.orderId !== this.order.orderId) {
                            return [2 /*return*/, res.status(400).send("Couldn't match to orderId")];
                        }
                        // check if correct payment
                        if (new this.web3.utils.BN(result.transaction.method.parameters._payeeAmounts[0]).lt(new this.web3.utils.BN(result.data.mainPayee.expectedAmount))) {
                            return [2 /*return*/, res.status(400).send('Insufficient amount paid')];
                        }
                        return [2 /*return*/, res.status(200).json(result)];
                    case 3:
                        err_2 = _d.sent();
                        console.error(err_2);
                        res.status(400).send('wrong transaction hash');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var mnemonic = 'butter route frozen life lizard laundry kiwi able second meadow company confirm';
        var provider = new HDWalletProvider(mnemonic, this.infuraNodeUrl);
        this.web3 = new Web3(provider.engine);
        try {
            this.rn = new request_network_js_1.default(provider, 4); // rinkeby testnet
        }
        catch (err) {
            console.error(err);
        }
    }
    return RequestCtrl;
}());
exports.default = RequestCtrl;
//# sourceMappingURL=request.controller.js.map