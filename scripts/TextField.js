define([
    'utils',
    'FormField',
    'Validator',
    'Formatter',
    'Placeholder'], function(utils, FormField, Validator, Formatter, Placeholder) {

    'use strict';

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    var TextField = function(name, $root, params) {
        FormField.call(this, $root)
        this._name = name;
        TextField.checkPlaceholder(this.$root);
        this.params = {
            validator: new Validator(),
            formatter: new Formatter(),
            invalidCSSClass: 'text-input_invalid'
        };
        $.extend(this.params, params);
        this.validator = this.params.validator;
        this.formatter = this.params.formatter;
        this.tabIndex = this.$root.attr('tabindex') || -1;
        this._oldValue = this.value();
        this.attachEvents();
    };

    utils.inherits(TextField, FormField);

    TextField.checkPlaceholder = function($input) {
        if (!('placeholder' in document.createElement('input'))) {
            new Placeholder($input);
        }
    };
    
    TextField.prototype.attachEvents = function() {
        this.on('change', this.processVal.bind(this));
        this.$root.on('focus', this.patchFocus.bind(this));
    };

    TextField.prototype.patchFocus = function() {
        this.$root.val(this.$root.val());
    };

    TextField.prototype.validate = function() {
        switch (this.validator.validate(this.value())) {
            case Validator.STATUSES.FULL:
                this.$root.removeClass(this.params.invalidCSSClass);
                this.emit('filled');
                this.focusNext();
                this.format();
                break;
            case Validator.STATUSES.PARTIAL:
                this.$root.removeClass(this.params.invalidCSSClass);
                break;
            case Validator.STATUSES.INVALID:
                this.$root.addClass(this.params.invalidCSSClass);
                break;
        }
    };

    TextField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.LEFT:
            case KEY_CODE.BACKSPACE:
                if (this.getCaret() === 0) {
                    e.preventDefault();
                    this.focusPrev();
                }
                break;
            case KEY_CODE.RIGHT:
                if (this.getCaret() === this.value().length) {
                    e.preventDefault();
                    this.focusNext();
                }
                break;
            default:
                break;
        }
    };

    TextField.prototype.isValid = function() {
        return this.validator.validate(this.value()) === Validator.STATUSES.FULL;
    };

    TextField.prototype.format = function() {
        this.value(this.formatter.format(this.value()));
        return this;
    };

    TextField.prototype.processVal = function() {
        this.validate();
        //this.format();
        if (this.value() != this._oldValue) {
            this._oldValue = this.value()
        }
    };

    TextField.prototype.value = function(val) {
        if (val == null) {
            return this.$root.val();
        } else {
            this.$root.val(val);
            return this;
        }
    };

    TextField.prototype.name = function() {
        return this._name;
    };

    TextField.prototype.getCaret = function() {
        return utils.getCaretPosition(this.$root[0]);
    };


    return TextField;

});