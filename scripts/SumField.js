define(['TextField', 'utils', 'Validator'], function(TextField, utils, Validator) {

    'use strict';

    var SumField = function(name, $root, $curr, params) {
        TextField.call(this, name, $root, params);
        this.$curr = $curr;
        this.on('change', this.onChange.bind(this));
    };

    utils.inherits(SumField, TextField);

    SumField.prototype.onChange = function() {
        this.$curr.text(utils.declOfNum(parseInt(this.value(), 10), ['рубль', 'рубля', 'рублей']));
    };

    return SumField;

});