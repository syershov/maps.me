var fieldTextInit = function () {
    var textField = document.querySelector('.field-text'),
        textFieldFocusClass = 'field-text_focus',
        textFieldSuccessClass = 'field-text_success';

    /* focus, blur */
    textField.addEventListener("focus", function( event ) {
        addClass(this, textFieldFocusClass);
    }, true);
    textField.addEventListener("blur", function( event ) {
        removeClass(this, textFieldFocusClass)
    }, true);
    /* focus, blur */

    /* check maxLength */
    textField.querySelector('.field-text__input').addEventListener("input", function( event ) {
        var _this        = this,
            val          = _this.value,
            wrapInput    = _this.closest('.field-text'),
            form         = _this.closest('form'),
            buttonSubmit = form.querySelector('.button_submit'),
            maxLength    = parseInt(this.getAttribute('maxlength'));

        if (val.length === maxLength) {
            addClass(wrapInput, textFieldSuccessClass);
            buttonSubmit.removeAttribute('disabled');
        }  else {
            removeClass(wrapInput, textFieldSuccessClass);
            buttonSubmit.setAttribute('disabled', 'disabled');
        }
    });
    /* check maxLength */
}