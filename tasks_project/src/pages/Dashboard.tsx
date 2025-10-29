// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aqui você pode adicionar a lógica de logout
        // Por enquanto, vamos redirecionar para a página de login
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-2xl font-bold text-gray-900">Bem vindo ao Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Sair
            </button>
        </div>
    );
};

export default Dashboard;