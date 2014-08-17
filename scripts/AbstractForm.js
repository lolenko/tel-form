define(function() {

    var AbstractForm = function(name, $form, fields, submitButton) {
        this.name = name;
        this.$form = $form;
        this.fields = fields;
        this.submitButton = submitButton;

        this.eachField((function(field) {
            field.on('change', this.validate.bind(this));
        }).bind(this));

        this.$form.on('submit', this.onSubmit.bind(this));
    };

    AbstractForm.prototype.eachField = function(fn) {
        return this.fields.forEach(fn);
    };

    AbstractForm.prototype.isValid = function() {
        var isValid = true;
        this.eachField(function(field) {
            if (!field.isValid()) {
                isValid = false;
            }
        });
        return isValid;
    };

    AbstractForm.prototype.validate = function() {
        if (this.isValid()) {
            this.submitButton.enable();
        } else {
            this.submitButton.disable();
        }
        return this;
    };

    AbstractForm.prototype.value = function() {
        var values = {};
        this.eachField(function(field) {
            values[field.name()] = (values[field.name()] === undefined)
                ? field.value() : values[field.name()] + ',' + field.value();
        });
        return {}[this.name] = values;
    };

    AbstractForm.prototype.onSubmit = function(e) {
        e.preventDefault();
        if (this.isValid()) {
            alert(JSON.stringify(this.value()));
        }
    };

    return AbstractForm;

});