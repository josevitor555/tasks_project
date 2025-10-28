from django.urls import path

# Import views
from . import views

urlpatterns = [
    path('cadastro/', views.cadastro, name='cadastro'), # Cadastro de usuários
    path('login/', views.login_view, name='login'), # Login de usuários
    path('platform/', views.platform, name='platform')
]