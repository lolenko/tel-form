define(function() {

    var TabIndexManager = function($root, fields) {
        this.$root = $root;
        this.fields = fields;

        var len = fields.length;
        fields.forEach(function(field, i) {
            field.on('readytoblurnext', this.focusTo.bind(this, fields[(i + 1) % len]));
            field.on('readytoblurprev', this.focusTo.bind(this, fields[i - 1 < 0 ? len - 1 : i - 1]));
        });
    };

    TabIndexManager.prototype.focusTo = function(field) {
        field.focus();
    };

});