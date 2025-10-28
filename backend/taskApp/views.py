from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

#  Função para cadastrar usuário
def cadastro(request):
    if request.method == 'GET':
        return render(request, template_name='cadastro.html')
    else:
        username = request.POST.get('username')

        email = request.POST.get('email')
        senha = request.POST.get('senha')
        
        # Verificação de campos vazios
        if not username or not email or not senha:
            return HttpResponse("Todos os campos são obrigatórios.".encode('utf-8'), content_type="text/plain; charset=utf-8")
        
        # Aqui você pode adicionar a lógica para salvar o usuário no banco de dados
        # Exemplo: User.objects.create_user(username=username, email=email, password=senha)
        


        return HttpResponse(username.encode('utf-8'), content_type="text/plain; charset=utf-8")      

#  Função para tela de login
def login(request):
    return render(request, 'login.html')
