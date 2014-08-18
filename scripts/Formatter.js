define(function() {

    'use strict';

    var Formatter = function(regEx, repFn) {
        this.regEx = regEx;
        this.repFn = repFn;
    };

    Formatter.prototype.format = function(val) {
        if (this.regEx && this.repFn) {
            return val.replace(this.regEx, this.repFn);
        } else {
            return val.trim();
        }
    };

    return Formatter;

});