require.config({
    baseUrl: "scripts",
    paths: {
        jquery: 'vendor/jquery-1.10.2.min'
    }
});

require([
    'AbstractForm',
    'Button',
    'TextField',
    'TelField',
    'SumField',
    'Validator',
    'Formatter',
    'jquery'
], function(AbstractForm, Button, TextField, TelField, SumField, Validator, Formatter) {

    'use strict';

    /**
     * Запускающий модуль. Строит поля телефонной формы и конфигурирует ими саму форму.
     * Поля формы кофигурируются валидаторами и форматтерами
     */

    var areaCodeField = new TextField('areaCode', $('.tel-field__global-code'), {
        validator: new Validator(/^\s*(\+\s*7|8)\s*$/, /^\s*(\+?\s*7?|8)\s*$/)
    });
    var countryCodeField = new TextField('countryCode', $('.tel-field__country-code'), {
        validator: new Validator(/^\s*\d{3}\s*$/, /^\s*\d{1,3}\s*$/)
    });
    var telNumberField = new TextField('telNumber', $('.tel-field__number'), {
        validator: new Validator(/^\s*\d{3}-?\d{2}-?\d{2}\s*$/, /^\s*\d{1,3}-?\d{0,2}-?\d{0,2}\s*$/),
        formatter: new Formatter(/^\s*(\d{3})-?(\d{2})-?(\d{2})\s*$/, '$1-$2-$3')
    });
    var telField = new TelField('tel', areaCodeField, countryCodeField, telNumberField);
    var sumField = new SumField('sum', $('.sum-field__sum'), $('.sum-field__curr'), {
        validator: new Validator(/^\s*([1-9]\d{0,2}|[1-4]\d{3}|50{3})\s*$/)
    });

    var submitButton = new Button($('.mobile-pay__submit'));

    new AbstractForm('mobilePay', $('.mobile-pay'), [telField, sumField], submitButton);

});
