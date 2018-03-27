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
var platform_browser_1 = require("@angular/platform-browser");
var ngx_page_scroll_1 = require("ngx-page-scroll");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(pageScrollService, document) {
        var _this = this;
        this.pageScrollService = pageScrollService;
        this.document = document;
        ngx_page_scroll_1.PageScrollConfig.defaultEasingLogic = {
            ease: function (t, b, c, d) {
                // easeInOutExpo easing
                if (t === 0)
                    return b;
                if (t === d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
        // this.docUrl = `${window.origin}/doc`;
        this.screenWidth = window.innerWidth;
        window.onresize = function () {
            _this.screenWidth = window.innerWidth;
        };
    }
    HomeComponent.prototype.scrollTo = function (idAnchor) {
        this.sidenav.toggle(false);
        var sideNavContent = this.sidenavContainer._element.nativeElement.getElementsByClassName('mat-sidenav-content');
        var pageScrollInstance = ngx_page_scroll_1.PageScrollInstance.newInstance({
            document: this.document,
            scrollTarget: idAnchor,
            scrollingViews: [sideNavContent[0]]
        });
        this.pageScrollService.start(pageScrollInstance);
    };
    ;
    HomeComponent.prototype.openDoc = function () {
        console.log(window.location);
    };
    __decorate([
        core_1.ViewChild('sidenavContainer'),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "sidenavContainer", void 0);
    __decorate([
        core_1.ViewChild('sidenav'),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "sidenav", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [ngx_page_scroll_1.PageScrollService, Object])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map