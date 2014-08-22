define(function() {

    'use strict';

    /**
     * Наследует ctor от superCtor
     *
     * @param {constructor} ctor - целевоей конструктор
     * @param {constructor} superCtor - наследуемый конструктор
     */

    var inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        var F = function() {};
        F.prototype = superCtor.prototype;
        ctor.prototype = new F();
        ctor.prototype.constructor = ctor;
    };


    /**
     * Возвращает позицию курсора элемента с возможностью ввода текста
     *
     * @param {(HTMLInputElement|HTMLTextAreaElement)} el
     * @returns {number} - позиция курсора
     */

    var getCaretPosition = function(el) {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = el.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    };

    /**
     * Склонение слова в зависимости от числительного
     *
     * @param {number} number - числительное
     * @param {string[]} titles - массив склонений типо ['секунда', 'секунды', 'секунд']
     * @returns {string} - результируещее склонение
     */

    var declOfNum = function(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    return {
        inherits: inherits,
        getCaretPosition: getCaretPosition,
        declOfNum: declOfNum
    };

});