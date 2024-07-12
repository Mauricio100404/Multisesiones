import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Register from './register';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import GoogleButton from 'react-google-button';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión con correo y contraseña:', error);
            setError('Credenciales incorrectas. Por favor, revisa tu email y contraseña.');
        }
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const handleRegistrationSuccess = () => {
        setShowRegister(false);
        setRegistrationSuccess(true);
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="login-form w-75">
                        <h2>Iniciar Sesión</h2>
                        {registrationSuccess && (
                            <div className="alert alert-success" role="alert">
                                Registro exitoso. Ahora puedes iniciar sesión.
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleEmailLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                        </form>
                        <hr />
                        <div className="d-flex justify-content-center">
                            <GoogleButton onClick={handleGoogleLogin} />
                        </div>
                        <p className="mt-3 text-center">
                            ¿No tienes cuenta? <button className="btn btn-link" onClick={toggleRegister}>Regístrate aquí</button>
                        </p>
                    </div>
                </div>
                <div className="col-md-6 p-0">
                    <img src="https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg" alt="Side Image" className="img-fluid vh-100" />
                </div>
            </div>
            {showRegister && (
                <div className="register-overlay">
                    <Register onSuccess={handleRegistrationSuccess} />
                </div>
            )}
        </div>
    );
};

export default Login;
