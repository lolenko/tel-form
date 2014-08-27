define([
    'utils',
    'FormField',
    'Validator',
    'Formatter',
    'Placeholder'], function(utils, FormField, Validator, Formatter, Placeholder) {

    'use strict';

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8,
        TAB: 9
    };

    /**
     * Конструктор текстового поля формы, конфигурируется необязательным
     * валидатором и форматером
     *
     * @param {string} name - имя элемента формы
     * @param {JQuery} $root - текстовый input или textarea
     * @param [params] - другие необезательные параметры
     * @param {Validator} [params.validator]
     * @param {Formatter} [params.formatter]
     * @constructor
     */

    var TextField = function(name, $root, params) {
        FormField.call(this, $root)
        this._name = name;
        TextField.checkPlaceholder(this.$root);
        this.params = {
            validator: new Validator(),
            formatter: new Formatter(),
            invalidCSSClass: 'text-input_invalid'
        };
        $.extend(this.params, params);
        this.validator = this.params.validator;
        this.formatter = this.params.formatter;
        this.tabIndex = this.$root.attr('tabindex') || -1;
        this.maxLength = this.$root.attr('maxlength') || Infinity;
        this.attachEvents();
    };

    utils.inherits(TextField, FormField);

    /**
     * В случае отсутствия реализации плейсхолдеров в браузере
     * строит на текстовом поле полифил
     *
     * @param {JQuery} $input
     */

    TextField.checkPlaceholder = function($input) {
        if (!('placeholder' in document.createElement('input'))) {
            new Placeholder($input);
        }
    };
    
    TextField.prototype.attachEvents = function() {
        this.on('change', this.processVal.bind(this));
        this.on('focus', this.patchFocus.bind(this));
    };

    /**
     *  Перстовляет при фокусе курсор всегда в конец значения
     */

    TextField.prototype.patchFocus = function() {
        this.$root.val(this.$root.val());
    };

    /**
     * Валидирует значения поля валидатором полученным
     * при конфигурации конструктора
     *
     * @returns {TextField}
     */

    TextField.prototype.validate = function() {
        switch (this.validator.validate(this.value())) {
            case Validator.STATUSES.FULL:
                this.$root.removeClass(this.params.invalidCSSClass);
                this.format();
                break;
            case Validator.STATUSES.PARTIAL:
                this.$root.removeClass(this.params.invalidCSSClass);
                break;
            case Validator.STATUSES.INVALID:
                this.$root.addClass(this.params.invalidCSSClass);
                break;
        }
        return this;
    };

    TextField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.BACKSPACE:
                if (this.getCaret() === 0) {
                    e.preventDefault();
                    this.focusPrev();
                }
                break;
            case KEY_CODE.LEFT:
                if (this.getCaret() === 0) {
                    e.preventDefault();
                    this.focusPrev();
                }
                break;
            case KEY_CODE.RIGHT:
                if (this.getCaret() === this.value().length) {
                    e.preventDefault();
                    this.focusNext();
                }
                break;
            case KEY_CODE.TAB:
                break;
            default:
                if (this.value().length == this.maxLength) {
                    //e.preventDefault();
                    this.focusNext();
                }
                break;
        }
    };

    /**
     * Возвращает флаг валидтости поля
     *
     * @returns {boolean}
     */

    TextField.prototype.isValid = function() {
        return this.validator.validate(this.value()) === Validator.STATUSES.FULL;
    };

    /**
     * Форматирует значение поля форматтером полученным
     * при конфигурации конструктора
     *
     * @returns {TextField}
     */

    TextField.prototype.format = function() {
        this.value(this.formatter.format(this.value()));
        return this;
    };

    /**
     * Манипуляции со значением при каждом изменение
     */

    TextField.prototype.processVal = function() {
        //this.format();
        this.validate();
    };

    /**
     * Устанавливает значение если передан аргумент
     * иначе возвращает значение текстового поля
     *
     * @param {string} [val]
     * @returns {(string|TextField)}
     */

    TextField.prototype.value = function(val) {
        if (val == null) {
            return this.$root.val();
        } else {
            this.$root.val(val);
            //this.processVal();
            return this;
        }
    };

    TextField.prototype.name = function() {
        return this._name;
    };

    /**
     * Возврощает индекс положения текстового курсора
     *
     * @returns {number}
     */

    TextField.prototype.getCaret = function() {
        return utils.getCaretPosition(this.$root[0]);
    };


    return TextField;

});