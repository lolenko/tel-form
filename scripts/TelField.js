define(['EventEmitter', 'utils'], function(EventEmitter, utils) {

    'use strict';

    /**
     * Композиция трёх полей телефона
     * реализует чать интерфейса TextField'а
     *
     * @param {string} name
     * @param {TextField} areaCodeField
     * @param {TextField} countryCodeField
     * @param {TextField} numberField
     * @constructor
     */

    var TelField = function (name, areaCodeField, countryCodeField, numberField) {
        this._name = name;
        this.areaCodeField = areaCodeField;
        this.countryCodeField = countryCodeField;
        this.numberField = numberField;
        this.attachEvents();
    };

    utils.inherits(TelField, EventEmitter);

    TelField.prototype.attachEvents = function() {
        [this.areaCodeField, this.countryCodeField, this.numberField].forEach((function(textField) {
            textField.on('change', this.emit.bind(this, 'change'));
        }).bind(this));
    };

    TelField.prototype.value = function() {
        var areaCode = this.areaCodeField.value();
        var countryCode = this.countryCodeField.value();
        var number = this.numberField.value();

        return areaCode + '(' + countryCode + ')' + number;
    };

    TelField.prototype.name = function() {
        return this._name;
    };

    TelField.prototype.isValid = function() {
        return this.areaCodeField.isValid() && this.countryCodeField.isValid() && this.numberField.isValid();
    };

    return TelField;

});