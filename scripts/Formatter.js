define(function() {

    var Formatter = function(regEx, repFn) {
        this.regEx = regEx || /[\W\w]/;
        this.repFn = repFn || function(val) { return val; };
    };

    Formatter.prototype.format = function(val) {
        return val.replace(this.regEx, this.repFn);
    };

    return Formatter;

});