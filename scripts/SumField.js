define(['EventEmitter', 'utils'], function(EventEmitter, utils) {

    function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    var SumField = function(textField, $curr) {
        this.textField = textField;
        this.$curr = $curr;

        this.textField.on('change', this.onChange.bind(this));
    };

    utils.inherits(SumField, EventEmitter);

    SumField.prototype.onChange = function() {
        this.emit('change');
        this.$curr.text(declOfNum(parseInt(this.value(), 10), ['рубль', 'рубля', 'рублей']));
    };

    SumField.prototype.value = function(val) {
        return this.textField.value(val);
    };

    SumField.prototype.name = function() {
        return this.textField.name();
    };

    SumField.prototype.isValid = function() {
        return this.textField.isValid();
    };

    return SumField;

});