define(['TextField', 'utils', 'Validator'], function(TextField, utils, Validator) {

    function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    var SumField = function(name, $root, $curr, params) {
        TextField.call(this, name, $root, params);
        this.$curr = $curr;
        this.on('change', this.onChange.bind(this));
    };

    utils.inherits(SumField, TextField);

    SumField.prototype.onChange = function() {
        this.$curr.text(declOfNum(parseInt(this.value(), 10), ['рубль', 'рубля', 'рублей']));
    };

    SumField.prototype.validate = function() {
        switch (this.validator.validate(this.value())) {
            case Validator.STATUSES.FULL:
                this.$root.removeClass(this.params.invalidCSSClass);
                this.emit('filled');
                if (parseInt(this.value(), 10) > 999) {
                    this.focusNext();
                }
                break;
            case Validator.STATUSES.PARTIAL:
                this.$root.removeClass(this.params.invalidCSSClass);
                break;
            case Validator.STATUSES.INVALID:
                this.$root.addClass(this.params.invalidCSSClass);
                break;
        }
    };

    return SumField;

});