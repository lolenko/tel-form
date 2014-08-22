define(function() {

    'use strict';

    var TabIndexManager = function(formFields) {
        if (TabIndexManager.instance instanceof TabIndexManager) {
            return TabIndexManager.instance;
        }
        TabIndexManager.instance = this;

        this.list = formFields || [];
    };

    TabIndexManager.compare = function(prevField, nextField) {
        return nextField.getTabIndex() - prevField.getTabIndex;
    };

    TabIndexManager.prototype.add = function(formField) {
        this.list.push(formField);
        this.sort();
        console.log(this.list);
    };

    TabIndexManager.prototype.sort = function() {
        this.list.sort(TabIndexManager.compare);
    };

    TabIndexManager.prototype.nextFrom = function(formField) {
        var list = this.list;
        var i = list.indexOf(formField);
        list[(i + 1) % list.length].focus()
    };

    TabIndexManager.prototype.nextFrom = function(formField) {
        var list = this.list;
        var listLen = list.length;
        var i = list.indexOf(formField);
        while(++i < listLen * 2) {
            if (!list[i % listLen].isDisabled()) {
                list[i % listLen].focus();
                break;
            }
        }
    };

    TabIndexManager.prototype.prevFrom = function(formField) {
        var list = this.list;
        var listLen = list.length;
        var i = list.indexOf(formField);
        while(--i > -listLen * 2) {
            if (!list[i < 0 ? listLen + i : i].isDisabled()) {
                list[i < 0 ? listLen + i : i].focus();
                break;
            }
        }
    };

    return TabIndexManager;

});