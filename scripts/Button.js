define(function() {

    var Button = function($button) {
        this.$button = $button;
    };

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

    return Button;

});