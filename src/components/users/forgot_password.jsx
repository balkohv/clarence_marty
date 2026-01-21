import './users.css';
import { useState, useEffect } from 'react';
import $ from 'jquery';

const api_url = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);
        const password = e.target[0].value;
        const confirmPassword = e.target[1].value;
        if(password !== confirmPassword){
            setLoading(false);
            setError('Passwords do not match.');
            return;
        }
        $.ajax({
            url: ''+api_url+'user_api.php',
            method: 'POST',
            data: {
                action: "reset_password",
                token: urlParams.get('token'),
                password : password,
            },
            success: (response) => {
                setLoading(false);
                if(response.status_code === 200) {
                    setMessage('Password reset successfully.');
                    window.location.href = '/login';
                } else {
                    setError(response.message || 'Password reset failed');
                }
            },
            error: () => {
                setLoading(false);
                setError('An error occurred. Please try again.');
            }
        });
    }

    return (
        <div className='container'>
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input placeholder="mot de passe" type="password" required />
                        <input placeholder="confirmer mot de passe" type="password" required />
                    </div>
                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Reset Password'}</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;