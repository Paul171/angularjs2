"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var lang_1 = require('../../src/facade/lang');
var router_1 = require('../router');
var RouterLink = (function () {
    function RouterLink(_router, _location) {
        var _this = this;
        this._router = _router;
        this._location = _location;
        // we need to update the link whenever a route changes to account for aux routes
        this._router.subscribe(function (_) { return _this._updateLink(); });
    }
    // because auxiliary links take existing primary and auxiliary routes into account,
    // we need to update the link whenever params or other routes change.
    RouterLink.prototype._updateLink = function () {
        this._navigationInstruction = this._router.generate(this._routeParams);
        var navigationHref = this._navigationInstruction.toLinkUrl();
        this.visibleHref = this._location.prepareExternalUrl(navigationHref);
    };
    Object.defineProperty(RouterLink.prototype, "isRouteActive", {
        get: function () { return this._router.isRouteActive(this._navigationInstruction); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLink.prototype, "routeParams", {
        set: function (changes) {
            this._routeParams = changes;
            this._updateLink();
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.onClick = function () {
        // If no target, or if target is _self, prevent default browser behavior
        if (!lang_1.isString(this.target) || this.target == '_self') {
            this._router.navigateByInstruction(this._navigationInstruction);
            return false;
        }
        return true;
    };
    RouterLink.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[routerLink]',
                    inputs: ['routeParams: routerLink', 'target: target'],
                    host: {
                        '(click)': 'onClick()',
                        '[attr.href]': 'visibleHref',
                        '[class.router-link-active]': 'isRouteActive'
                    }
                },] },
    ];
    RouterLink.ctorParameters = [
        { type: router_1.Router, },
        { type: common_1.Location, },
    ];
    return RouterLink;
}());
exports.RouterLink = RouterLink;
//# sourceMappingURL=router_link.js.map