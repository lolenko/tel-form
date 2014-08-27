define(['EventEmitter', 'utils', 'TabIndexManager'], function(EventEmitter, utils, TabIndexManager) {

    var KEY_CODE = {
        LEFT: 37,
        RIGHT: 39,
        BACKSPACE: 8
    };

    /**
     * Конструктор поля формы - делегирует нажатие клавиш стрелок
     * лево-право и бэкспэйса TabIndexManager'у,
     * генерирует на экзэмляре событие change при любом изменении
     * значения
     *
     * @param {JQuery} $root - Jquery обёртка над input, textarea, select или button
     * @constructor
     */

    var FormField = function($root) {
        if (!($root instanceof $ && $root.length === 1 && $root.is('input, textarea, select, button'))) {
            throw new TypeError('Аргумент $root должен быть Jquery обьектом с единственным элементом типа input, textarea, select или button')
        }
        this.$root = $root;
        this.tabIndex = this.$root.attr('tabindex') || -1;
        this.dispatchEvents();
        this.$root.on('keydown', this.onKeyDown.bind(this));
        this.tim = new TabIndexManager();
        this.tim.add(this);
    };

    utils.inherits(FormField, EventEmitter);

    FormField.prototype.dispatchEvents = function() {
        this.$root.on('focus blur focusin focusout change input propertychange cut paste', (function(e) {
            var type = e.type;
            if (type == 'change' || type == 'input' || type == 'propertychange' || type == 'cut' || type == 'paste') {
                this.emit('change');
            } else {
                this.emit(type);
            }
        }).bind(this));
    };

    /**
     * Фокусировка на элементе формы
     *
     * @returns {FormField}
     */

    FormField.prototype.focus = function() {
        this.$root.focus();
        return this;
    };

    /**
     * Фокусировка на следующем по tabindex'у элементе
     *
     * @returns {FormField}
     */

    FormField.prototype.focusNext = function() {
        this.tim.nextFrom(this);
        return this;
    };

    /**
     * Фокусировка на предыдущем по tabindex'у элементе
     *
     * @returns {FormField}
     */

    FormField.prototype.focusPrev = function() {
        this.tim.prevFrom(this);
        return this
    };

    FormField.prototype.getTabIndex = function() {
        return this.tabIndex;
    };

    FormField.prototype.isDisabled = function() {
        return this.$root.is('[disabled], [readonly]');
    };

    FormField.prototype.onKeyDown = function(e) {
        switch (e.which) {
            case KEY_CODE.LEFT:
                e.preventDefault();
                this.focusPrev();
                break;
            case KEY_CODE.RIGHT:
                e.preventDefault();
                this.focusNext();
                break;
            default:
                break;
        }
    };

    return FormField;

});