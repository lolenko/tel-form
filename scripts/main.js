require.config({
    baseUrl: "/scripts",
    paths: {
        jquery: '/scripts/vendor/jquery-1.10.2.min'
    }
});

require([
    'AbstractForm',
    'Button',
    'TextField',
    'TelField',
    'SumField',
    'Validator',
    'jquery'
], function(AbstractForm, Button, TextField, TelField, SumField, Validator) {

    var areaCodeField = new TextField('areaCode', $('.tel-field__global-code'), {
        validator: new Validator(/^\s*(\+\s*7|8)\s*$/, /^\s*(\+?\s*7|8)\s*$/)
    });
    var countryCodeField = new TextField('countryCode', $('.tel-field__country-code'), {
        validator: new Validator(/^\s*\d{3}\s*$/, /^\s*\d{1,3}\s*$/)
    });
    var telNumberField = new TextField('telNumber', $('.tel-field__number'), {
        validator: new Validator(/^\s*\d{3}\s*-?\s*\d{2}\s*-?\s*\d{2}\s*$/, /^\s*\d{1,3}\s*-?\s*\d{0,2}\s*-?\s*\d{0,2}\s*$/)
    });
    var telField = new TelField('tel', areaCodeField, countryCodeField, telNumberField);
    var numField = new TextField('sum', $('.sum-field__sum'), {validator: new Validator(/^\s*(\d{1,3}|[1-4]\d{3}|50{3})\s*$/)});

    var sumField = new SumField(numField, $('.sum-field__curr'));

    new AbstractForm('mobilePay', $('.mobile-pay'), [telField, sumField], new Button($('.mobile-pay__submit')));

});
