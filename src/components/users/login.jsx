import React from 'react';
import $ from 'jquery';
import './users.css';

const api_url = import.meta.env.VITE_API_URL;

const Login = () => {
  
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);    

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        $.ajax({
            url: ''+api_url+'user_api.php',
            method: 'POST',
            data: {
                action: "login",
                login: login,
                password: password
            },
            success: (response) => {
                setLoading(false);
                if(response.status_code === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    window.location.href = '/admin';
                } else {
                    setError(response.message || 'Login failed');
                }
            },
            error: () => {
                setLoading(false);
                setError('An error occurred. Please try again.');
            }
        });
    }

    const handleForgotPassword = () => {
        setError(null);
        setLoading(true);
        if(!login){
            setLoading(false);
            setError('Please enter your login to recover password.');
            return;
        }
        $.ajax({
            url: ''+api_url+'user_api.php',
            method: 'POST',
            data: {
                action: "password_recovery",
                login: login
            },
            success: (response) => {
                if(response.status_code === 200) {
                    alert('Password reset link sent to your email.');
                    setLoading(false);
                } else {
                    setError(response.message || 'Request failed');
                    setLoading(false);
                }
            },
            error: () => {
                setError('An error occurred. Please try again.');
                setLoading(false);
            }
        });
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </div>
                <div>
                    <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <a onClick={handleForgotPassword}>mot de passe oublié</a>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    );
};

export default Login;