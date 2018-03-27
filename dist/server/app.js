"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var path = require("path");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/doc', express.static(path.join(__dirname, '../doc')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(morgan('dev'));
routes_1.default(app);
app.get('/doc', function (req, res) {
    res.sendFile(path.join(__dirname, '../doc/index.html'));
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
if (!module.parent) {
    app.listen(app.get('port'), function () {
        console.log('request-OP listening on port ' + app.get('port'));
    });
}
//# sourceMappingURL=app.js.map