import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/animated-dialog';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [isLoginView, setIsLoginView] = useState(true); // Changed default to login view
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '', // Added username field
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Função para validar o nome conforme as regras especificadas
    const validateName = (name: string): boolean => {
        // Verificar se o nome tem mais de 50 caracteres
        if (name.length > 50) {
            return false;
        }

        // Expressão regular para validar caracteres permitidos:
        // - Letras maiúsculas e minúsculas (incluindo acentos e ç)
        // - Espaços em branco
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

        // Verificar se todos os caracteres são válidos
        if (!nameRegex.test(name)) {
            return false;
        }

        // Verificar se há espaços consecutivos
        if (name.includes('  ')) {
            return false;
        }

        // Verificar se começa ou termina com espaço
        if (name.startsWith(' ') || name.endsWith(' ')) {
            return false;
        }

        // Se passou por todas as validações, o nome é válido
        return true;
    };

    // Função para validar o e-mail conforme as regras especificadas
    const validateEmail = (email: string): boolean => {
        // Verificar se o e-mail tem mais de 50 caracteres
        if (email.length > 50) {
            return false;
        }

        // Expressão regular para validar o formato do e-mail
        // Aceita subdomínios e caracteres especiais permitidos no nome de usuário
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Verificar se o e-mail está no formato válido
        if (!emailRegex.test(email)) {
            return false;
        }

        // Se passou por todas as validações, o e-mail é válido
        return true;
    };

    // Função para validar a senha conforme as regras especificadas
    const validatePassword = (password: string): boolean => {
        // Verificar o comprimento da senha (entre 8 e 20 caracteres)
        if (password.length < 8 || password.length > 20) {
            return false;
        }

        // Verificar se contém pelo menos uma letra maiúscula
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Verificar se contém pelo menos um número
        if (!/[0-9]/.test(password)) {
            return false;
        }

        // Verificar se contém pelo menos um caractere especial
        const specialChars = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/;
        if (!specialChars.test(password)) {
            return false;
        }

        // Se passou por todas as validações, a senha é válida
        return true;
    };

    // Função para lidar com o envio do formulário de login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação de campos
        if (!formData.username || !formData.password) {
            setMessage({ type: 'error', text: 'Nome de usuário e senha são obrigatórios.' });
            setShowDialog(true);
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // Chamada para a API de login
            const response = await fetch('http://127.0.0.1:8000/auth/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            // Verificar se a resposta da API foi bem-sucedida
            const data = await response.json();

            if (data.success) {
                
                // Store username in localStorage
                localStorage.setItem('username', data.username);
                setMessage({ type: 'success', text: data.message });
                setShowDialog(true);

                // Redirecionar para o dashboard após 2 segundos
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message });
                setShowDialog(true);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao conectar com o servidor.' });
            setShowDialog(true);
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação de campos
        if (!formData.name || !formData.email || !formData.password) {
            setMessage({ type: 'error', text: 'Todos os campos são obrigatórios.' });
            setShowDialog(true);
            return;
        }

        // Validar o formato do nome
        if (!validateName(formData.name)) {
            setMessage({
                type: 'error',
                text: 'Nome inválido. Use apenas letras, acentos, espaços e cedilha. Máximo de 50 caracteres.'
            });
            setShowDialog(true);
            return;
        }

        // Validar o formato do e-mail
        if (!validateEmail(formData.email)) {
            setMessage({
                type: 'error',
                text: 'E-mail inválido. Deve conter nome de usuário, @ e domínio. Máximo de 50 caracteres.'
            });
            setShowDialog(true);
            return;
        }

        // Validar o formato da senha
        if (!validatePassword(formData.password)) {
            setMessage({
                type: 'error',
                text: 'Senha inválida. Deve ter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.'
            });
            setShowDialog(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'As senhas não coincidem.' });
            setShowDialog(true);
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // Chamada para a API de registro
            const response = await fetch('http://127.0.0.1:8000/auth/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }),
            });

            // Verificar se a resposta da API foi bem-sucedida
            const data = await response.json();

            if (data.success) {
                // Store username in localStorage
                localStorage.setItem('username', formData.name);
                setMessage({ type: 'success', text: data.message });
                setShowDialog(true);
                // Limpar formulário após sucesso
                setFormData({ name: '', email: '', username: '', password: '', confirmPassword: '' });
                // Redirecionar para o dashboard após 2 segundos
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message });
                setShowDialog(true);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao conectar com o servidor.' });
            setShowDialog(true);
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Determinar se é a vista de login ou de registro
        if (isLoginView) {
            await handleLogin(e);
        } else {
            await handleRegister(e);
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setFormData({ name: '', email: '', username: '', password: '', confirmPassword: '' });
        setMessage(null);
    };

    return (
        <div className="min-h-screen flex font-roboto">
            
            {/* Componente de Diálogo */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-[425px] bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <DialogHeader>
                        <DialogTitle className={message?.type === 'success' ? 'text-green-600' : message?.type === 'error' ? 'text-red-600' : 'text-blue-600'}>
                            {message?.type === 'success' ? 'Sucesso' : message?.type === 'error' ? 'Erro' : 'Informação'}
                        </DialogTitle>
                        <DialogDescription>
                            {message?.text}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button 
                                type="button" 
                                variant={message?.type === 'success' ? 'default' : 'outline'}
                                className={message?.type === 'success' ? '' : 'border border-input'}
                            >
                                {message?.type === 'success' ? 'Continuar' : 'Tentar Novamente'}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#d87753]">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <img
                                src="/Chronos.svg"
                                alt="Chronos Logo"
                                width="80"
                                height="80"
                                className="object-containh-20 w-20"
                                style={{ filter: "invert(1)" }}
                                role="img"
                                aria-label="Chronos Logo"
                            />
                        </div>
                        <h1 className="text-4xl font-bold text-primary-foreground mb-2 font-raleway">
                            {isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                        </h1>
                        <p className="text-[#fafafa] font-roboto">
                            {isLoginView ? 'Faça login para continuar' : 'Gerencie suas tarefas de forma fácil com Chronos'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            {!isLoginView && (
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-primary-foreground text-base font-medium font-raleway">
                                        Nome
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Entre com seu nome completo"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="pl-10 h-12 border border-input focus:border-primary focus:ring-primary font-roboto"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            )}

                            {isLoginView ? (
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-primary-foreground text-base font-medium font-raleway">
                                        Nome de Usuário
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Entre com seu nome de usuário"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="pl-10 h-12 border border-input focus:border-primary focus:ring-primary font-roboto"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-primary-foreground text-base font-medium font-raleway">
                                        E-mail
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Entre com seu e-mail"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="pl-10 h-12 border border-input focus:border-primary focus:ring-primary font-roboto"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-primary-foreground text-base font-medium font-raleway">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Entre com sua senha"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10 h-12 border border-input focus:border-primary focus:ring-primary font-roboto"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {!isLoginView && (
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-primary-foreground text-base font-medium font-raleway">
                                        Repetir Senha
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Repetir Senha"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="pl-10 pr-10 h-12 border border-input focus:border-primary focus:ring-primary font-roboto"
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            disabled={loading}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={toggleView}
                                className="text-sm text-accent font-medium transition-colors cursor-pointer font-roboto"
                                disabled={loading}
                            >
                                {isLoginView ? 'Não tens uma conta?' : 'Tens uma conta?'}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-accent text-accent-foreground cursor-pointer font-medium rounded-full disabled:opacity-50 font-raleway"
                            disabled={loading}
                        >
                            {loading ? 'Processando...' : (isLoginView ? 'Entrar' : 'Criar Uma Conta')}
                        </button>
                    </form>
                </div>
            </div>


            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#d87753] items-center justify-center p-4">
                <div className="bg-white text-center flex flex-col items-center justify-center h-full w-full py-16 shadow-lg mx-2 mt-8 mb-8">
                    <div className="p-4 inline-flex items-center justify-center mt-54 mb-8 flex-col">
                        <img
                            src="/Chronos.svg"
                            alt="Tasks Logo"
                            width="180"
                            height="180"
                            className="object-contain"
                        />
                        <p className="text-[#2A2A2A] text-6xl font-bold font-raleway mt-4">
                            CHRONOS
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full max-w-md h-12 bg-[#d87753] rounded-full flex items-center justify-center gap-2 mt-auto font-raleway text-base px-6 py-3"
                    >
                        <Lock className="h-5 w-5" />
                        Autenticação 2F
                        <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded text-primary-foreground font-roboto">
                            Sua conta será protegida com 2F
                        </span>
                    </button>
                    {/* <div className="mt-8 text-center text-sm text-[#2A2A2A] font-roboto">
                        Feito com ❤️ por José Vitor, Monalisa e Júlia
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;