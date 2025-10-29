import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [isLoginView, setIsLoginView] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação de campos
        if (!isLoginView) {
            // Validação para registro
            if (!formData.name || !formData.email || !formData.password) {
                setMessage({ type: 'error', text: 'Todos os campos são obrigatórios.' });
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'As senhas não coincidem.' });
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
                        password: formData.password
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    setMessage({ type: 'success', text: data.message });
                    // Limpar formulário após sucesso
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    // Redirecionar para o dashboard após 6 segundos
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 6000);
                } else {
                    setMessage({ type: 'error', text: data.message });
                }
            } catch (error) {
                setMessage({ type: 'error', text: 'Erro ao conectar com o servidor.' });
                console.error('Erro:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Para a view de login, podemos adicionar a lógica aqui posteriormente
            setMessage({ type: 'info', text: 'Funcionalidade de login ainda não implementada.' });
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setMessage(null);
    };

    return (
        <div className="min-h-screen flex font-roboto">
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

                    {/* Mensagens de feedback */}
                    {message && (
                        <div className={`p-3 rounded-md ${message.type === 'error' ? 'bg-red-500' : message.type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white font-roboto`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
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

                            {!isLoginView && (
                                <>
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
                                </>
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
                    <div className="p-4 inline-flex items-center justify-center mt-32 mb-8 flex-col">
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
                    <div className="mt-8 text-center text-sm text-[#2A2A2A] font-roboto">
                        Feito com ❤️ por José Vitor, Monalisa e Júlia
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
