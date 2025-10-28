from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User # Model User (Class)
from django.contrib.auth import authenticate, login as auth_login
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

#  Função para cadastrar usuário
def cadastro(request):
    if request.method == 'GET':
        return render(request, template_name='cadastro.html')
    else:
        username = request.POST.get('username')

        email = request.POST.get('email')
        senha = request.POST.get('senha')

        user = User.objects.filter(username=username).first()

        # Verificação de usuário já existente
        if user:
            return HttpResponse("Já existe um usuário com esse username!".encode('utf-8'), content_type="text/plain; charset=utf-8")
        
        # Verificação de campos vazios
        if not username or not email or not senha:
            return HttpResponse("Todos os campos são obrigatórios.".encode('utf-8'), content_type="text/plain; charset=utf-8")

        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save() # Salva o usuário no banco de dados

        return HttpResponse("Usuário cadastrado com sucesso!".encode('utf-8'), content_type="text/plain; charset=utf-8")     

#  Função para tela de login
def login_view(request):
    if request.method == 'GET':
        return render(request, template_name='login.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')

        # Buscar usuário diretamente pelo username e email
        try:
            user = User.objects.get(username=username, email=email)
        except ObjectDoesNotExist:
            user = None
        
        # Verificação de usuário existente no banco de dados
        if user:
            auth_login(request, user)
            return HttpResponse("Usuário logado com sucesso!".encode('utf-8'), content_type="text/plain; charset=utf-8")
        else:
            return HttpResponse("Usuário ou email incorretos!".encode('utf-8'), content_type="text/plain; charset=utf-8")

def platform(request):
    if request.user.is_authenticated:
        return render(request, template_name='platform.html')
    
    return HttpResponse('Você precisa estar logado para acessar essa página!'.encode('utf-8'), content_type="text/plain; charset=utf-8")
    # return render('Você precisa estar logado para acessar essa página!'.encode('utf-8'), content_type="text/plain; charset=utf-8")