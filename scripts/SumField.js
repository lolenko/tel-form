define(['TextField', 'utils', 'Validator'], function(TextField, utils, Validator) {

    'use strict';

    /**
     * Хардкодное расширение TextField'а, по изменению значения склонирует
     * слово 'рубль'
     *
     * @param {string} name - имя элемента формы
     * @param {JQuery} $root - текстовый input или textarea
     * @param {JQuery} $curr - 'рубль' который надо склонять
     * @param [params] - другие необезательные параметры
     * @param {Validator} [params.validator]
     * @param {Formatter} [params.formatter]
     * @constructor
     */

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