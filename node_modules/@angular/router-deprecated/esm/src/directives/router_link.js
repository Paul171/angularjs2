import { Directive } from '@angular/core';
import { Location } from '@angular/common';
import { isString } from '../../src/facade/lang';
import { Router } from '../router';
export class RouterLink {
    constructor(_router, _location) {
        this._router = _router;
        this._location = _location;
        // we need to update the link whenever a route changes to account for aux routes
        this._router.subscribe((_) => this._updateLink());
    }
    // because auxiliary links take existing primary and auxiliary routes into account,
    // we need to update the link whenever params or other routes change.
    _updateLink() {
        this._navigationInstruction = this._router.generate(this._routeParams);
        var navigationHref = this._navigationInstruction.toLinkUrl();
        this.visibleHref = this._location.prepareExternalUrl(navigationHref);
    }
    get isRouteActive() { return this._router.isRouteActive(this._navigationInstruction); }
    set routeParams(changes) {
        this._routeParams = changes;
        this._updateLink();
    }
    onClick() {
        // If no target, or if target is _self, prevent default browser behavior
        if (!isString(this.target) || this.target == '_self') {
            this._router.navigateByInstruction(this._navigationInstruction);
            return false;
        }
        return true;
    }
}
RouterLink.decorators = [
    { type: Directive, args: [{
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
    { type: Router, },
    { type: Location, },
];
//# sourceMappingURL=router_link.js.map