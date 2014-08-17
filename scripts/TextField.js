define(['AbstractFormField', 'utils', 'jquery'], function(AbstractFormField, utils) {

    var TextField = function($root, params) {
        TextField.super_.apply(this, arguments);
        this.attachEvents();
    };

    utils.inherits(TextField, AbstractFormField);

    TextField.prototype.attachEvents = function() {
        this.$root.on('keyup', this.processVal.bind(this));
    };

    return TextField;
});