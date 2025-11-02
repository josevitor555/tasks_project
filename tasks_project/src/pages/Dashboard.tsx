import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    // useEffect to fetch username when component mounts
    useEffect(() => {
        // Get username from localStorage or other storage mechanism
        // For now, we'll use a placeholder
        const storedUsername = localStorage.getItem('username') || 'Usuário';
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        // Clear any stored user data
        localStorage.removeItem('username');
        // Redirect to login page
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-2xl font-bold text-gray-900">Seja bem vindo, {username}</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Sair
            </button>
        </div>
    );
};

export default Dashboard;