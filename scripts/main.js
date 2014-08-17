require.config({
    baseUrl: "/scripts",
    paths: {
        jquery: '/scripts/vendor/jquery-1.10.2.min'
    }
});

require(['TextField', 'Validator', 'jquery'], function(TextField, Validator) {
    new TextField($('.tel-field__number'), {
        validator: new Validator(/^\s*\d{1,3}\s*-?\s*\d{0,2}\s*-?\s*\d{0,2}\s*$/, /^\s*\d{3}\s*-?\s*\d{2}\s*-?\s*\d{2}\s*$/)
    });
    new TextField($('.tel-field__country-code'), {validator: new Validator(/^\s*\d{1,3}\s*$/, /^\s*\d{1,3}\s*$/)});
    new TextField($('.sum-field__sum'), {validator: new Validator(/^\s*(\d{0,3}|[1-4]\d{3}|50{3})\s*$/)});
});
