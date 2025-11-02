from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User # Model User (Class)
from django.contrib.auth import authenticate, login as auth_login
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

# Create your views here.

# API View para cadastro de usuários via REST
@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(View):
    def post(self, request):
        try:
            # Parse do corpo da requisição JSON
            data = json.loads(request.body)
            username = data.get('name')
            email = data.get('email')
            password = data.get('password')
            confirm_password = data.get('confirmPassword')
            
            # Verificação de campos obrigatórios
            if not username or not email or not password:
                return JsonResponse({
                    'success': False,
                    'message': 'Todos os campos são obrigatórios.'
                }, status=400)
            
            # Verificação de confirmação de senha
            if password != confirm_password:
                return JsonResponse({
                    'success': False,
                    'message': 'As senhas não coincidem.'
                }, status=400)
            
            # Validação do nome (apenas letras, acentos, espaços e cedilha, máximo 50 caracteres)
            if len(username) > 50:
                return JsonResponse({
                    'success': False,
                    'message': 'O nome deve ter no máximo 50 caracteres.'
                }, status=400)
            
            # Verificar caracteres válidos (letras, acentos, espaços e cedilha)
            import re
            if not re.match(r'^[a-zA-ZÀ-ÿ\s]+$', username):
                return JsonResponse({
                    'success': False,
                    'message': 'O nome deve conter apenas letras, acentos, espaços e cedilha.'
                }, status=400)
            
            # Verificar espaços consecutivos
            if '  ' in username:
                return JsonResponse({
                    'success': False,
                    'message': 'O nome não deve conter espaços consecutivos.'
                }, status=400)
            
            # Verificar se começa ou termina com espaço
            if username.startswith(' ') or username.endswith(' '):
                return JsonResponse({
                    'success': False,
                    'message': 'O nome não deve começar ou terminar com espaço.'
                }, status=400)
            
            # Validação do e-mail (formato válido e máximo 50 caracteres)
            if len(email) > 50:
                return JsonResponse({
                    'success': False,
                    'message': 'O e-mail deve ter no máximo 50 caracteres.'
                }, status=400)
            
            # Verificar formato do e-mail
            if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
                return JsonResponse({
                    'success': False,
                    'message': 'O e-mail deve estar em um formato válido.'
                }, status=400)
            
            # Validação da senha (entre 8 e 20 caracteres, pelo menos uma letra maiúscula, um número e um caractere especial)
            if len(password) < 8 or len(password) > 20:
                return JsonResponse({
                    'success': False,
                    'message': 'A senha deve ter entre 8 e 20 caracteres.'
                }, status=400)
            
            # Verificar se contém pelo menos uma letra maiúscula
            if not re.search(r'[A-Z]', password):
                return JsonResponse({
                    'success': False,
                    'message': 'A senha deve conter pelo menos uma letra maiúscula.'
                }, status=400)
            
            # Verificar se contém pelo menos um número
            if not re.search(r'[0-9]', password):
                return JsonResponse({
                    'success': False,
                    'message': 'A senha deve conter pelo menos um número.'
                }, status=400)
            
            # Verificar se contém pelo menos um caractere especial
            if not re.search(r'[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]', password):
                return JsonResponse({
                    'success': False,
                    'message': 'A senha deve conter pelo menos um caractere especial.'
                }, status=400)
            
            # Verificação de usuário já existente
            if User.objects.filter(username=username).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'Já existe um usuário com esse nome de usuário.'
                }, status=400)
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'Já existe um usuário com esse email.'
                }, status=400)
            
            # Criação do usuário
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            
            return JsonResponse({
                'success': True,
                'message': f'Seja bem vindo, {username}',
                'username': username
            })
            
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Dados inválidos fornecidos.'
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Erro ao cadastrar usuário: {str(e)}'
            }, status=500)

# API View para login de usuários via REST
@method_decorator(csrf_exempt, name='dispatch')
class UserLoginView(View):
    def post(self, request):
        try:
            # Parse do corpo da requisição JSON
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            # Verificação de campos obrigatórios
            if not username or not password:
                return JsonResponse({
                    'success': False,
                    'message': 'Nome de usuário e senha são obrigatórios.'
                }, status=400)
            
            # Autenticação do usuário
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                # Login bem-sucedido
                auth_login(request, user)
                return JsonResponse({
                    'success': True,
                    'message': f'Seja bem vindo, {user.username}',
                    'username': user.username
                })
            else:
                # Credenciais inválidas
                return JsonResponse({
                    'success': False,
                    'message': 'Nome de usuário ou senha inválidos.'
                }, status=400)
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Dados inválidos fornecidos.'
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Erro ao fazer login: {str(e)}'
            }, status=500)
