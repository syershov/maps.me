var phoneCountryInit = function() {
    $.getJSON("js/data/phone-codes.json", function( data ) {
        var phone_number_0 = $("#phone_number_0"),
            phone_number_1 = $("#phone_number_1");

        var regexp_string,
            body = $('body'),
            phone_country = $('.phone-country'),
            default_county = phone_country.data('cc'),
            county_input = $('.country-mask'),
            icon_check = $('.phone-country__icon .icon'),
            button_submit = $('.button_submit'),
            flags_current_img = $('.flags__current img');

        county_input.on('focus', function(e){
            phone_country.addClass('phone-country_focus');
        }).on('blur', function(e){
            phone_country.removeClass('phone-country_focus');
        });

        var options =  {
            onComplete: function(cep) {
                icon_check.removeClass().addClass('icon icon_16 icon_check_full');
                button_submit.prop("disabled", false);
                phone_country.removeClass('phone-country_error');
                phone_number_1.val(county_input.val().replace(/[(,), ,-]/g, ''));
            },
            onKeyPress: function(value, e, field, options){

                $.each(data, function(i, v) {

                    regexp_string = value.replace('+', '\\+').replace('(', '\\(').replace(')', '\\)');
                    if ((regexp_string.length > 1) &&
                        (v.mask.search(new RegExp(regexp_string)) !== -1)) {

                        var mask = v.mask.replace(/[0-9,#]/g, '0');

                        flags_current_img.removeClass().addClass('flag flag-' + v.cc.toString().toLowerCase());

                        county_input.mask(mask, options);
                        phone_number_0.val(v.mask.substring(0, v.mask.indexOf('#')).replace(/[(,), ,-]/g, ''));
                        return false;
                    }
                });

                phone_number_1.val('');
                icon_check.removeClass().addClass('icon icon_16 icon_check_empty');
                button_submit.prop('disabled', true);
            }
        };

        var flags = $('.flags'),
            list = flags.find('.flags__list'),
            rows = '';

        $.each(data, function(i, v) {
            var mask = v.mask,
                right_mask = mask.substring(0, mask.indexOf('#'));
                right_mask = right_mask.replace(/[(,)]/g, '');
                right_mask = right_mask.replace(/[-]/g, ' ');

            rows +=  '<div class="flags__item" data-cc="' + v.cc + '">'
                        + '<div class="country-row">'
                            + '<div class="country-row__img">'
                                + '<img src="img/blank.gif" class="flag flag-' + v.cc.toString().toLowerCase() + '"/>'
                            + '</div>'
                            + '<div class="country-row__name">'
                                + v.name_en
                            + '</div>'
                            + '<div class="country-row__code">'
                                + right_mask
                            + '</div>'
                        + '</div>'
                    + '</div>'
        });
        list.html(rows);

        flags.on('click', '.flags__current', function(e){
            var _this = $(this),
                parent = _this.parents('.flags');

            parent.toggleClass('flags_open');

        }).on('click', '.flags__item', function(e){
            var _this = $(this),
                cc = _this.data('cc'),
                parent = _this.parents('.flags');

            $.each(data, function(i, v) {
                if (v.cc === cc) {

                    var mask = v.mask.replace(/[0-9,#]/g, '0');

                    county_input.mask(mask, options);
                    county_input.val(v.mask.substring(0, v.mask.indexOf('#')));
                    county_input.focus();

                    phone_number_0.val(v.mask.substring(0, v.mask.indexOf('#')).replace(/[(,), ,-]/g, ''));

                    flags_current_img.removeClass().addClass('flag flag-' + v.cc.toString().toLowerCase());
                    icon_check.removeClass().addClass('icon icon_16 icon_check_empty');
                    button_submit.prop('disabled', true);
                    parent.removeClass('flags_open');

                    return false;
                }
            });
        });
        body.on('keydown', '.country-mask', function(e){
                var _this = $(this),
                    val = _this.val();

                if (e.keyCode === 8) {

                    if (val.length === 1) {
                        e.preventDefault();
                    } else if ((_this[0].selectionStart === 0) && (_this[0].selectionEnd === (val.length) )) {
                        e.preventDefault();
                        _this.val('+');
                    }
                }

                flags.removeClass('flags_open');
            });
        $('.flags__item[data-cc="' + default_county + '"]').click();
    });
};