# This file is not strictly necessary for DRF routers, but good for specific endpoints like webhooks.
from django.urls import path
from . import views

urlpatterns = [
    # path('stripe-webhook/', views.stripe_webhook_view, name='stripe-webhook'),
]
