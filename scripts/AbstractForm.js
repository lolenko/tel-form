define(function() {

    'use strict';

    /**
     * Слушает изменения всех полей формы, валидирует и на основе валидности
     * всех полей активирует/деактивирует кнопку сабмита. По запросу собирает
     * значение всей формы.
     *
     * @param {string} name - имя формы
     * @param {JQuery} $form - корневая нода формы
     * @param {FormField[]} fields - массив полей формы
     * @param {Button} submitButton - сабмитящая кнопка
     * @constructor
     */

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

    /**
     * Применяет колбэк к каждому полю формы
     *
     * @param {function} fn
     * @returns {*}
     */

    AbstractForm.prototype.eachField = function(fn) {
        return this.fields.forEach(fn);
    };

    /**
     * Предикат валидности формы. Форма валидна если валидны все поля
     *
     * @returns {boolean}
     */

    AbstractForm.prototype.isValid = function() {
        return this.fields.every(function(field) { return field.isValid() });
    };

    /**
     * Пока просто запускается при каждом изменении значений формы
     *
     * @returns {AbstractForm}
     */

    AbstractForm.prototype.validate = function() {
        this.submitButton.enable(this.isValid());
        return this;
    };

    /**
     * Собирает значения всех полей в один обьект
     *
     * @returns {{}}
     */

    AbstractForm.prototype.value = function() {
        var values = {};
        this.eachField(function(field) {
            values[field.name()] = (values[field.name()] === undefined)
                ? field.value() : values[field.name()] + ',' + field.value();
        });
        return {}[this.name] = values;
    };

    /**
     * Обработчик события submit, алертит значение формы
     *
     * @param {JQueryEvent} e
     */

    AbstractForm.prototype.onSubmit = function(e) {
        e.preventDefault();
        if (this.isValid()) {
            alert(JSON.stringify(this.value()));
        }
    };

    return AbstractForm;

});