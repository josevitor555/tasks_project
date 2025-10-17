import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-2">
                            {isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isLoginView ? 'Faça login para continuar' : 'Gerencie suas tarefas de forma fácil'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground text-base font-medium">
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
                                        className="pl-10 h-12 border border-input focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground text-base font-medium">
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
                                        className="pl-10 h-12 border border-input focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {!isLoginView && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-foreground text-base font-medium">
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
                                                className="pl-10 pr-10 h-12 border border-input focus:border-primary focus:ring-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-foreground text-base font-medium">
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
                                                className="pl-10 pr-10 h-12 border border-input focus:border-primary focus:ring-primary"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                                className="text-sm text-primary font-medium transition-colors cursor-pointer"
                            >
                                {isLoginView ? 'Não tens uma conta?' : 'Tens uma conta?'}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            {isLoginView ? 'Entrar' : 'Criar Uma Conta'}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-accent to-accent/80 items-center justify-center p-4">
                <div className="bg-card text-center flex flex-col items-center justify-center h-full py-16 rounded-lg">
                    <div className="p-4 inline-flex items-center justify-center mt-32 mb-8">
                        <img 
                            src="/logo_tasks-removebg-preview.png" 
                            alt="Tasks Logo" 
                            width="620"
                            height="620"
                            className="object-contain"
                        />
                    </div>
                    <Button
                        type="button"
                        className="w-full max-w-sm h-12 bg-primary rounded-full flex items-center justify-center gap-2 mt-auto"
                    >
                        <Lock className="h-5 w-5" />
                        Autenticação 2F
                        <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded text-primary-foreground">Sua conta será protegida com 2F</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;