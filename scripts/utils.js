define(function() {
    var inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype);
        ctor.prototype.constructor = ctor;
    };

    return {
        inherits: inherits
    };
});