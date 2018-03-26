"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request_controller_1 = require("./controllers/request.controller");
function setRoutes(app) {
    var router = express.Router();
    var requestCtrl = new request_controller_1.default();
    router.route('/signRequest').post(requestCtrl.signRequest);
    router.route('/getTxDetails/:txHash').get(requestCtrl.getTxDetails);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map