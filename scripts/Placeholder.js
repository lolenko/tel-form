define(['jquery'], function($) {

    var Placeholder = function($input) {
        this.$input = $input;
        this.isVisible = true;
        this.build();
        this.check();
    };

    Placeholder.PLACEHOLDER_HTML = '<span class="placeholder"><span class="placeholder__text"></span></span>';

    Placeholder.prototype.build = function() {
        var $placeholder = $(Placeholder.PLACEHOLDER_HTML);
        var $plText = this.$plText = $placeholder.find('.placeholder__text');
        var $input = this.$input;
        var plText = this.$input.attr('placeholder');
        $input.removeAttr('placeholder');
        $plText.text(plText);
        var plCSS = {
            padding: $input.css('padding'),
            margin: $input.css('margin'),
            borderWidth: $input.css('borderWidth'),
            lineHeight: $input.css('lineHeight'),
            verticalAlign: $input.css('verticalAlign'),
            textAlign: $input.css('textAlign'),
            borderColor: 'transparent'
        };
        $plText.css(plCSS);
        $placeholder.on('click', function() {
            $input.focus();
        });
        this.$input.on('keyup', this.check.bind(this));
        this.$input.replaceWith($placeholder);
        $placeholder.append($input);
    };

    Placeholder.prototype.check = function() {
        if (this.$input.val().length && this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    };

    Placeholder.prototype.hide = function() {
        this.$plText.hide();
        this.isVisible = false;
    };

    Placeholder.prototype.show = function() {
        this.$plText.show();
        this.isVisible = true;
    };

    return Placeholder;

});
