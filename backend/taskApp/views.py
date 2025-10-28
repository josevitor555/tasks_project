from django.shortcuts import render

# Create your views here.

#  Função para cadastrar usuário
def cadastro(request):
    return render(request, 'cadastro.html')

#  Função para tela de login
def login(request):
    return render(request, 'login.html')