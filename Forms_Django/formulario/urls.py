from django.urls import path
from . import views

urlpatterns = [

    path('propriedade/', views.teste),
    path('proprietario/', views.teste),
]