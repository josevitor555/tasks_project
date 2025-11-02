from django.urls import path

# Import views
from . import views

urlpatterns = [
    # path('cadastro/', views.cadastro, name='cadastro'), # Cadastro de usuários
    # path('login/', views.login_view, name='login'), # Login de usuários
    # path('platform/', views.platform, name='platform'),
    path('api/register/', views.UserRegistrationView.as_view(), name='api_register'), # API de cadastro
    path('api/login/', views.UserLoginView.as_view(), name='api_login'), # API de login
]
