define([
    'utils',
    'EventEmitter',
    'Validator',
    'Formatter',
    'Placeholder'], function(utils, EventEmitter, Validator, Formatter, Placeholder) {

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    var TextField = function(name, $root, params) {
        this._name = name;
        this.$root = $root;
        TextField.checkPlaceholder(this.$root);
        this.params = {
            validator: new Validator(),
            formatter: new Formatter(),
            invalidCSSClass: 'text-input_invalid'
        };
        $.extend(this.params, params);
        this.validator = this.params.validator;
        this.formatter = this.params.formatter;
        this._oldValue = this.value();
        this.prevField = null;
        this.nextField = null;
        this.attachEvents();
    };

    utils.inherits(TextField, EventEmitter);

    TextField.checkPlaceholder = function($input) {
        if (!('placeholder' in document.createElement('input'))) {
            new Placeholder($input);
        }
    };
    
    TextField.prototype.attachEvents = function() {
        this.$root.on('keydown', this.onKeyDown.bind(this));
        this.$root.on('focus', this.patchFocus.bind(this));
    };

    TextField.prototype.patchFocus = function() {
        this.$root.val(this.$root.val());
    };

    TextField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.LEFT:
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
            case KEY_CODE.BACKSPACE:
                if (this.value().length === 0) {
                    e.preventDefault();
                    this.focusPrev();
                }
                setTimeout(this.processVal.bind(this), 0);
                break;
            default:
                setTimeout(this.processVal.bind(this), 0);
                break;
        }
    };

    TextField.prototype.focusNext = function() {
        if (this.nextField !== null) {
            this.nextField.focus();
            this.emit('blur');
        }
    };

    TextField.prototype.focusPrev = function() {
        if (this.prevField !== null) {
            this.prevField.focus('left');
            this.emit('blur');
        }
    };

    TextField.prototype.focus = function(dir) {
        if (this.$root.is('[disabled], [readonly]')) {
            if (dir == 'left') {
                this.focusPrev()
            } else {
                this.focusNext();
            }
            return;
        }
        this.$root.focus();
        this.emit('focus');
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

    TextField.prototype.isValid = function() {
        return this.validator.validate(this.value()) === Validator.STATUSES.FULL;
    };

    TextField.prototype.format = function() {
        this.value(this.formatter.format(this.value()));
        return this;
    };

    TextField.prototype.processVal = function() {
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

    TextField.prototype.setNextField = function(field) {
        this.nextField = field;
    };

    TextField.prototype.setPrevField = function(field) {
        this.prevField = field;
    };

    TextField.prototype.getCaret = function() {
        var el = this.$root[0];
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = el.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    };

    return TextField;

});