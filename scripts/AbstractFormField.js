define(['utils', 'EventEmitter', 'Validator', 'Formatter'], function(utils, EventEmitter, Validator, Formatter) {

    var AbstractFormField = function($root, params) {
        this.$root = $root;
        this.params = {
            validator: new Validator(),
            formatter: new Formatter(),
            invalidCSSClass: 'text-input_invalid'
        };
        $.extend(this.params, params);
        this.validator = this.params.validator;
        this.formatter = this.params.formatter;
    };

    utils.inherits(AbstractFormField, EventEmitter);

    AbstractFormField.prototype.validate = function() {
        switch (this.validator.validate(this.value())) {
            case Validator.STATUSES.FULL:
            case Validator.STATUSES.PARTIAL:
                this.$root.removeClass(this.params.invalidCSSClass);
                break;
            case Validator.STATUSES.INVALID:
                this.$root.addClass(this.params.invalidCSSClass);
                break;
        }
    };

    AbstractFormField.prototype.format = function() {
        this.value(this.formatter.format(this.value()));
        return this;
    };

    AbstractFormField.prototype.processVal = function() {
        //this.format();
        this.validate();
    };

    AbstractFormField.prototype.value = function(val) {
        if (val == null) {
            return this.$root.val();
        } else {
            this.$root.val(val);
            return this;
        }
    };

    return AbstractFormField;

});