"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlertMessage = /** @class */ (function () {
    function AlertMessage(type, message, timeout, header, dismissible) {
        if (timeout === void 0) { timeout = 10000; }
        if (dismissible === void 0) { dismissible = true; }
        this.type = type;
        this.message = message;
        this.timeout = timeout;
        this.header = header;
        this.dismissible = dismissible;
    }
    return AlertMessage;
}());
exports.AlertMessage = AlertMessage;
//# sourceMappingURL=AlertMessage.js.map