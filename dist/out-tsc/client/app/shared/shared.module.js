"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatDialogModule } from '@angular/material/dialog';
var divider_1 = require("@angular/material/divider");
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
var progress_spinner_1 = require("@angular/material/progress-spinner");
// import { MatSelectModule } from '@angular/material/select';
var sidenav_1 = require("@angular/material/sidenav");
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                // FormsModule,
                // ReactiveFormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                button_1.MatButtonModule,
                // MatCardModule,
                // MatCheckboxModule,
                // MatChipsModule,
                // MatDialogModule,
                divider_1.MatDividerModule,
                // MatIconModule,
                // MatMenuModule,
                // MatInputModule,
                // MatListModule,
                // MatPaginatorModule,
                // MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                // MatSelectModule,
                sidenav_1.MatSidenavModule,
            ],
            declarations: [],
            exports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                // FormsModule,
                // ReactiveFormsModule,
                http_1.HttpModule,
                common_1.CommonModule,
                button_1.MatButtonModule,
                // MatCardModule,
                // MatCheckboxModule,
                // MatChipsModule,
                // MatDialogModule,
                divider_1.MatDividerModule,
                // MatIconModule,
                // MatMenuModule,
                // MatInputModule,
                // MatListModule,
                // MatPaginatorModule,
                // MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                // MatSelectModule,
                sidenav_1.MatSidenavModule,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map