"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.views.generic import TemplateView

from .views import EnterPhoneView, EnterCodeView


def user(request):
    return {
        'user': {
            'username': 'Smart Guy'
        }
    }

social_endpoint_views = [
    url(
        r'^begin/(?P<provider>[\w-]+)$',
        TemplateView.as_view(template_name='profile.html'),
        name='begin'
    ),
]

otp_endpoint_views = [
    url(r'^login',
        EnterPhoneView.as_view(),
        name='login'
        ),
    url(r'^check/(?P<sid>\w+)',
        EnterCodeView.as_view(),
        name='check'
        ),
]

urlpatterns = [
    url(r'', include('django.contrib.auth.urls')),
    url(
        r'^oauth/',
        include(social_endpoint_views, namespace='social')
    ),
    url(
        r'^otp/',
        include(otp_endpoint_views, namespace='otp')
    ),
    url(
        r'^profile/$',
        TemplateView.as_view(template_name='profile.html'),
        name='user_profile'
    ),
    url(
        r'privacy_policy.html$',
        TemplateView.as_view(template_name='privacy_policy.html'),
        name='privacy_policy'
    ),

]
