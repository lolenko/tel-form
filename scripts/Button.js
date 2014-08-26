define(['FormField', 'utils'], function(FormField, utils) {

    'use strict';

    /**
     * Кнопка, по сути расширяет FormField и доопределяет пару свойственных
     * только кнопкам методов, на данный момент пока только  disable/enable
     *
     * @param {JQuery} $button
     * @constructor
     */

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
        return this;
    };

    Button.prototype.disable = function() {
        return this.enable(false);
    };

    return Button;

});