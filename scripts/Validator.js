define(function() {

    var Validator = function(fullMatchRegEx, partialMatchRegEx) {
        this.fullMatchRegEx = fullMatchRegEx || /[\W\w]/;
        this.partialMatchRegEx = partialMatchRegEx || this.fullMatchRegEx;
    };

    var VALIDATION_STATUSES = {
        FULL: 1,
        PARTIAL: 2,
        INVALID: 3
    };

    Validator.STATUSES = VALIDATION_STATUSES;

    Validator.prototype = {
        constructor: Validator,

        validate: function(val) {
            if (this.fullMatchRegEx.test(val)) {
                return Validator.STATUSES.FULL;
            } else if (this.partialMatchRegEx.test(val)) {
                return Validator.STATUSES.PARTIAL;
            } else {
                return Validator.STATUSES.INVALID;
            }
        }
    };

    return Validator;
});