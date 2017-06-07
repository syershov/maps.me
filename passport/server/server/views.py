import logging
from urllib.parse import urlparse, urlunparse

from django import forms
from django.urls import reverse
from django.utils.http import urlencode
from django.views.generic import FormView

from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.modelfields import PhoneNumberField as PhoneNumberFieldDB
from phonenumber_field.phonenumber import PhoneNumber
from phonenumber_field.widgets import PhoneNumberPrefixWidget


class PhoneNumberForm(forms.Form):
    phone_number = PhoneNumberField(
        label='Phone number',
        max_length=100,
        widget=PhoneNumberPrefixWidget
    )


class EnterPhoneView(FormView):
    template_name = 'registration/enter-phone-number.html'
    form_class = PhoneNumberForm

    def form_invalid(self, form):
        phone_number = form.data
        print("Entered phone number: {}".format(phone_number))
        return super().form_invalid(form)

    def form_valid(self, form):
        phone_number = form.cleaned_data['phone_number']
        print("Entered phone number: {}".format(phone_number))
        return super().form_valid(form)

    def get_success_url(self):
        kwargs = {'sid': 'sid0000000000000'}
        next_url = self.request.GET.get('next', '')
        parts = urlparse(reverse('otp:check', kwargs=kwargs))
        redirect_url = urlunparse((
            parts.scheme,
            parts.netloc,
            parts.path,
            '',
            urlencode({'next': next_url}) if next_url else '',
            ''
        ))
        return redirect_url


class EnterCodeForm(forms.Form):
    phone_number = forms.CharField(
        label='Phone number',
        max_length=15,
        widget=forms.HiddenInput()
    )
    code = forms.CharField(
        label='Code',
        max_length=100
    )


class EnterCodeView(FormView):
    template_name = 'registration/enter-code.html'
    form_class = EnterCodeForm

    def get_initial(self):
        initial = super().get_initial()
        initial['phone_number'] = PhoneNumber(
            country_code='+7',
            national_number='9162345678',
        )
        return initial

    def form_invalid(self, form):
        print("Invalid form data: {}".format(form.data))
        return super().form_invalid(form)

    def form_valid(self, form):
        code = form.cleaned_data['code']
        print("Code is: {}".format(code))
        if code != '000000':
            form.add_error('code', 'Invalid code')
            return super().form_invalid(form)

        return super().form_valid(form)

    def get_success_url(self):
        return reverse('user_profile')
