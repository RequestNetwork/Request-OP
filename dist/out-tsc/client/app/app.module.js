"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("./shared/shared.module");
var ngx_page_scroll_1 = require("ngx-page-scroll");
var request_service_1 = require("./services/request.service");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var shop_component_1 = require("./shop/shop.component");
var confirm_component_1 = require("./confirm/confirm.component");
var home_component_1 = require("./home/home.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                shop_component_1.ShopComponent,
                confirm_component_1.ConfirmComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                app_routing_module_1.AppRoutingModule,
                ngx_page_scroll_1.NgxPageScrollModule
            ],
            providers: [
                request_service_1.RequestService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map