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

    var areaCodeField = new TextField('areaCode', $('.tel-field__global-code'), {
        validator: new Validator(/^\s*(\+\s*7|8)\s*$/, /^\s*(\+?\s*7?|8)\s*$/)
    });
    var countryCodeField = new TextField('countryCode', $('.tel-field__country-code'), {
        validator: new Validator(/^\s*\d{3}\s*$/, /^\s*\d{1,3}\s*$/)
    });
    var telNumberField = new TextField('telNumber', $('.tel-field__number'), {
        validator: new Validator(/^\s*\d{3}\s*-?\s*\d{2}\s*-?\s*\d{2}\s*$/, /^\s*\d{1,3}\s*-?\s*\d{0,2}\s*-?\s*\d{0,2}\s*$/)
    });
    var telField = new TelField('tel', areaCodeField, countryCodeField, telNumberField);
    var sumField = new SumField('sum', $('.sum-field__sum'), $('.sum-field__curr'), {
        validator: new Validator(/^\s*([1-9]\d{0,2}|[1-4]\d{3}|50{3})\s*$/)
    });

    var submitButton = new Button($('.mobile-pay__submit'));

    new AbstractForm('mobilePay', $('.mobile-pay'), [telField, sumField], submitButton);
    AbstractForm.buildTabIndexQueue([areaCodeField, countryCodeField, telNumberField, sumField]);

});
