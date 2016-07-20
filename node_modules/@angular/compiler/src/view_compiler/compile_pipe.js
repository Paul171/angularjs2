"use strict";
var lang_1 = require('../facade/lang');
var exceptions_1 = require('../facade/exceptions');
var o = require('../output/output_ast');
var identifiers_1 = require('../identifiers');
var util_1 = require('./util');
var _PurePipeProxy = (function () {
    function _PurePipeProxy(instance, argCount) {
        this.instance = instance;
        this.argCount = argCount;
    }
    return _PurePipeProxy;
}());
var CompilePipe = (function () {
    function CompilePipe(view, name) {
        this.view = view;
        this._purePipeProxies = [];
        this.meta = _findPipeMeta(view, name);
        this.instance = o.THIS_EXPR.prop("_pipe_" + name + "_" + view.pipeCount++);
    }
    Object.defineProperty(CompilePipe.prototype, "pure", {
        get: function () { return this.meta.pure; },
        enumerable: true,
        configurable: true
    });
    CompilePipe.prototype.create = function () {
        var _this = this;
        var deps = this.meta.type.diDeps.map(function (diDep) {
            if (diDep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                return util_1.getPropertyInView(o.THIS_EXPR.prop('ref'), _this.view, _this.view.componentView);
            }
            return util_1.injectFromViewParentInjector(diDep.token, false);
        });
        this.view.fields.push(new o.ClassField(this.instance.name, o.importType(this.meta.type)));
        this.view.createMethod.resetDebugInfo(null, null);
        this.view.createMethod.addStmt(o.THIS_EXPR.prop(this.instance.name)
            .set(o.importExpr(this.meta.type).instantiate(deps))
            .toStmt());
        this._purePipeProxies.forEach(function (purePipeProxy) {
            util_1.createPureProxy(_this.instance.prop('transform').callMethod(o.BuiltinMethod.bind, [_this.instance]), purePipeProxy.argCount, purePipeProxy.instance, _this.view);
        });
    };
    CompilePipe.prototype.call = function (callingView, args) {
        if (this.meta.pure) {
            var purePipeProxy = new _PurePipeProxy(o.THIS_EXPR.prop(this.instance.name + "_" + this._purePipeProxies.length), args.length);
            this._purePipeProxies.push(purePipeProxy);
            return util_1.getPropertyInView(o.importExpr(identifiers_1.Identifiers.castByValue)
                .callFn([purePipeProxy.instance, this.instance.prop('transform')]), callingView, this.view)
                .callFn(args);
        }
        else {
            return util_1.getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
        }
    };
    return CompilePipe;
}());
exports.CompilePipe = CompilePipe;
function _findPipeMeta(view, name) {
    var pipeMeta = null;
    for (var i = view.pipeMetas.length - 1; i >= 0; i--) {
        var localPipeMeta = view.pipeMetas[i];
        if (localPipeMeta.name == name) {
            pipeMeta = localPipeMeta;
            break;
        }
    }
    if (lang_1.isBlank(pipeMeta)) {
        throw new exceptions_1.BaseException("Illegal state: Could not find pipe " + name + " although the parser should have detected this error!");
    }
    return pipeMeta;
}
//# sourceMappingURL=compile_pipe.js.map