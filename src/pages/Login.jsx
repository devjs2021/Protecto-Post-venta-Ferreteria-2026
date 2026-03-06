import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogIn, AlertCircle, Lock, Wrench, Package, ShoppingCart, BarChart3 } from 'lucide-react';
import api from '../api/client';
import logoSrc from '../Logo/Logo1.jpeg';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login', { username, password });

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            console.error('Error en login:', err);
            setError(err.response?.data?.error || 'Error de conexión con el servidor. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: '#F5F5F5',
            overflow: 'hidden'
        }}>
            {/* Panel izquierdo - Branding */}
            <div style={{
                flex: '0 0 50%',
                background: 'linear-gradient(135deg, #F2A900 0%, #D4950A 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                position: 'relative',
                overflow: 'hidden'
            }}
                className="login-left-panel"
            >
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute', top: '-60px', left: '-60px',
                    width: '200px', height: '200px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-40px', right: '-40px',
                    width: '160px', height: '160px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                }} />
                <div style={{
                    position: 'absolute', top: '30%', right: '10%',
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.06)'
                }} />

                {/* Logo */}
                <div style={{
                    width: '120px', height: '120px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    marginBottom: '32px', overflow: 'hidden',
                    border: '4px solid rgba(255,255,255,0.5)'
                }}>
                    <img src={logoSrc} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h1 style={{
                    fontSize: '28px', fontWeight: 800, color: '#FFFFFF',
                    textAlign: 'center', margin: '0 0 8px 0',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    lineHeight: 1.2
                }}>
                    FERRETERIA LA ESQUINA<br />DEL PROGRESO
                </h1>
                <p style={{
                    fontSize: '15px', color: 'rgba(255,255,255,0.85)',
                    textAlign: 'center', margin: '0 0 48px 0',
                    fontWeight: 500
                }}>
                    Sistema de Gestión Integral
                </p>

                {/* Feature icons */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: '16px', width: '100%', maxWidth: '320px'
                }}>
                    {[
                        { icon: ShoppingCart, label: 'Punto de Venta' },
                        { icon: Package, label: 'Inventario' },
                        { icon: BarChart3, label: 'Análisis' },
                        { icon: Wrench, label: 'Herramientas' },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px 16px', borderRadius: '12px',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <Icon size={20} style={{ color: '#FFFFFF', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 500 }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel derecho - Formulario */}
            <div style={{
                flex: '0 0 50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                backgroundColor: '#FFFFFF'
            }}
                className="login-right-panel"
            >
                <div style={{ width: '100%', maxWidth: '380px' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '36px' }}>
                        <h2 style={{
                            fontSize: '26px', fontWeight: 700, color: '#333333',
                            margin: '0 0 8px 0'
                        }}>
                            Bienvenido
                        </h2>
                        <p style={{ fontSize: '14px', color: '#999999', margin: 0 }}>
                            Ingresa tus credenciales para acceder al sistema
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#DC2626',
                            fontSize: '13px',
                            fontWeight: 500
                        }}>
                            <AlertCircle size={18} style={{ flexShrink: 0 }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} method="post" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555555', marginBottom: '8px' }}>
                                Usuario
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{
                                    position: 'absolute', left: '14px', top: '50%',
                                    transform: 'translateY(-50%)', color: '#BBBBBB',
                                    display: 'flex', alignItems: 'center'
                                }}>
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Ingresa tu usuario"
                                    autoComplete="username"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '13px 14px 13px 44px',
                                        border: '2px solid #EEEEEE',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        backgroundColor: '#FAFAFA',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#F2A900';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(242,169,0,0.1)';
                                        e.target.style.backgroundColor = '#FFFFFF';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#EEEEEE';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.backgroundColor = '#FAFAFA';
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#555555', marginBottom: '8px' }}>
                                Contraseña
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{
                                    position: 'absolute', left: '14px', top: '50%',
                                    transform: 'translateY(-50%)', color: '#BBBBBB',
                                    display: 'flex', alignItems: 'center'
                                }}>
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '13px 14px 13px 44px',
                                        border: '2px solid #EEEEEE',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                        backgroundColor: '#FAFAFA',
                                        fontFamily: 'inherit'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#F2A900';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(242,169,0,0.1)';
                                        e.target.style.backgroundColor = '#FFFFFF';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#EEEEEE';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.backgroundColor = '#FAFAFA';
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !username || !password}
                            style={{
                                marginTop: '8px',
                                backgroundColor: (loading || !username || !password) ? '#CCCCCC' : '#F2A900',
                                color: (loading || !username || !password) ? '#999999' : '#333333',
                                padding: '14px',
                                borderRadius: '10px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: (loading || !username || !password) ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s',
                                boxShadow: (loading || !username || !password) ? 'none' : '0 4px 12px rgba(242,169,0,0.3)'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading && username && password) {
                                    e.currentTarget.style.backgroundColor = '#D4950A';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(242,169,0,0.4)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading && username && password) {
                                    e.currentTarget.style.backgroundColor = '#F2A900';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(242,169,0,0.3)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                            onMouseDown={(e) => { if (!loading && username && password) e.currentTarget.style.transform = 'scale(0.98)'; }}
                            onMouseUp={(e) => { if (!loading && username && password) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: '18px', height: '18px',
                                        border: '2px solid rgba(51,51,51,0.3)',
                                        borderTopColor: '#333333',
                                        borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite'
                                    }} />
                                    Iniciando sesion...
                                </>
                            ) : (
                                <>
                                    Iniciar Sesion
                                    <LogIn size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p style={{
                        textAlign: 'center', color: '#CCCCCC',
                        fontSize: '12px', marginTop: '40px'
                    }}>
                        FERRETERIA LA ESQUINA DEL PROGRESO &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>

            {/* Responsive: en mobile, ocultar panel izquierdo */}
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .login-left-panel { display: none !important; }
                    .login-right-panel {
                        flex: 1 1 100% !important;
                        padding: 32px 24px !important;
                    }
                }
            `}</style>
        </div>
    );
}
