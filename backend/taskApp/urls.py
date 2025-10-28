from django.urls import path

# Import views
from . import views

urlpatterns = [
    path('cadastro/', views.cadastro, name='cadastro'), # Cadastro de uusários
    path('login/', views.login, name='login'), # Login de usuários
]