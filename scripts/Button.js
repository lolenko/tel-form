define(['EventEmitter', 'utils'], function(EventEmitter, utils) {

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    var Button = function($button) {
        this.$button = $button;
        this.prevField = null;
        this.nextField = null;
    };

    utils.inherits(Button, EventEmitter);

    Button.prototype.enable = function(is) {
        is = (is == undefined) ? true : is;
        if (is) {
            this.$button.removeAttr("disabled");
        } else {
            this.$button.attr("disabled", "disabled");
        }
    };

    Button.prototype.disable = function() {
        this.enable(false);
    };

    Button.prototype.focusNext = function() {
        if (this.nextField !== null) {
            this.nextField.focus();
            this.emit('blur');
        }
    };

    Button.prototype.focusPrev = function() {
        if (this.prevField !== null) {
            this.prevField.focus('left');
            this.emit('blur');
        }
    };

    Button.prototype.focus = function(dir) {
        if (this.$button.is('[disabled], [readonly]')) {
            if (dir == 'left') {
                this.focusPrev()
            } else {
                this.focusNext();
            }
            return;
        }
        this.$button.focus();
        this.emit('focus');
    };

    Button.prototype.setNextField = function(field) {
        this.nextField = field;
    };

    Button.prototype.setPrevField = function(field) {
        this.prevField = field;
    };

    return Button;

});