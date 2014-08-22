define(['EventEmitter', 'utils', 'TabIndexManager'], function(EventEmitter, utils, TabIndexManager) {

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    var FormField = function($root) {
        if (!($root instanceof $ && $root.length === 1 && $root.is('input, textarea, select, button'))) {
            throw new TypeError('Аргумент $root должен быть Jquery обьектом с единственным элементом типа input, textarea, select или button')
        }
        this.$root = $root;
        this.tabIndex = this.$root.attr('tabindex') || -1;
        this.dispatchEvents();
        this.$root.on('keydown', this.onKeyDown.bind(this));
        this.tim = new TabIndexManager();
        this.tim.add(this);
    };

    utils.inherits(FormField, EventEmitter);

    FormField.prototype.dispatchEvents = function() {
        this.$root.on('focus blur focusin focusout change input propertychange', (function(e) {
            var type = e.type;
            if (type == 'change' || type == 'input' || type == 'propertychange') {
                this.emit('change');
            } else {
                this.emit(type);
            }
        }).bind(this));
    };

    FormField.prototype.focus = function() {
        this.$root.focus();
    };

    FormField.prototype.focusNext = function() {
        this.tim.nextFrom(this);
    };

    FormField.prototype.focusPrev = function() {
        this.tim.prevFrom(this);
    };

    FormField.prototype.getTabIndex = function() {
        return this.tabIndex;
    };

    FormField.prototype.isDisabled = function() {
        return this.$root.is('[disabled], [readonly]');
    };

    FormField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.LEFT:
            case KEY_CODE.BACKSPACE:
                e.preventDefault();
                this.focusPrev();
                break;
            case KEY_CODE.RIGHT:
                e.preventDefault();
                this.focusNext();
                break;
            default:
                break;
        }
    };

    return FormField;

});