define(['FormField', 'utils'], function(FormField, utils) {

    'use strict';

    var Button = function($button) {
        FormField.call(this, $button);
    };

    utils.inherits(Button, FormField);

    Button.prototype.enable = function(is) {
        is = (is == undefined) ? true : is;
        if (is) {
            this.$root.removeAttr("disabled");
        } else {
            this.$root.attr("disabled", "disabled");
        }
    };

    Button.prototype.disable = function() {
        this.enable(false);
    };

    return Button;

});