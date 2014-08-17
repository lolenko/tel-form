define(['utils', 'EventEmitter', 'Validator', 'Formatter'], function(utils, EventEmitter, Validator, Formatter) {

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    var TextField = function(name, $root, params) {
        this._name = name;
        this.$root = $root;
        this.params = {
            validator: new Validator(),
            formatter: new Formatter(),
            invalidCSSClass: 'text-input_invalid'
        };
        $.extend(this.params, params);
        this.validator = this.params.validator;
        this.formatter = this.params.formatter;
        this._oldValue = this.value();
        this.attachEvents();
    };

    utils.inherits(TextField, EventEmitter);
    
    TextField.prototype.attachEvents = function() {
        this.$root.on('keyup', this.processVal.bind(this));
        this.$root.on('keydown', this.onKeyDown.bind(this));
    };

    TextField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.LEFT:
                break;
            case KEY_CODE.RIGHT:
                this.emit('readytoblur');
                break;
            case KEY_CODE.BACKSPACE:
                if (this.value().length === 0) {

                }
                break;
        }
    };

    TextField.prototype.focus = function() {
        this.$root.focus();
    };

    TextField.prototype.validate = function() {
        switch (this.validator.validate(this.value())) {
            case Validator.STATUSES.FULL:
                this.$root.removeClass(this.params.invalidCSSClass);
                this.emit('filled');
                break;
            case Validator.STATUSES.PARTIAL:
                this.$root.removeClass(this.params.invalidCSSClass);
                break;
            case Validator.STATUSES.INVALID:
                this.$root.addClass(this.params.invalidCSSClass);
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
        //this.format();
        this.validate();
        if (this.value() != this._oldValue) {
            this.emit('change');
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

    return TextField;

});