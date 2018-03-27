"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var request_service_1 = require("../services/request.service");
var environment_1 = require("../../environments/environment");
var platform_browser_1 = require("@angular/platform-browser");
var ShopComponent = /** @class */ (function () {
    function ShopComponent(document, requestService) {
        this.document = document;
        this.requestService = requestService;
        this.items = [
            { desc: 'Ledger Nano S', priceUnit: 0.083, quantity: 1 },
            { desc: 'Trezor', priceUnit: 0.086, quantity: 0 },
            { desc: 'Cryptosteel Mnemonic', priceUnit: 0.092, quantity: 1 }
        ];
        this.orderId = '030890';
        this.gatewayUrl = environment_1.environment.gatewayUrl;
        this.callbackUrl = this.document.location.origin + "/#/confirm/";
    }
    ShopComponent.prototype.getTotal = function () {
        var total = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            total += item.priceUnit * item.quantity;
        }
        return total;
    };
    ShopComponent.prototype.payWithEth = function () {
        var _this = this;
        console.log('click on pay with ETH');
        this.requestService.signRequest({ orderId: this.orderId }).subscribe(function (res) {
            if (res.signature) {
                _this.document.location.href = "" + _this.gatewayUrl + encodeURIComponent(JSON.stringify({ signedRequest: res, callbackUrl: _this.callbackUrl }));
            }
        }, function (error) {
            console.log(error);
        });
    };
    ShopComponent = __decorate([
        core_1.Component({
            selector: 'app-shop',
            templateUrl: './shop.component.html',
            styleUrls: ['./shop.component.scss']
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object, request_service_1.RequestService])
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map