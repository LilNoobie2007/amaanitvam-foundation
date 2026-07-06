import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [orgName, setOrgName] = useState('Amaanitvam Foundation');

  const [is2FARequired, setIs2FARequired] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [code2fa, setCode2fa] = useState('');
  const [tempCredentials, setTempCredentials] = useState(null);

  const { user, login, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${baseURL}/public/settings`);

        if (res.data.settings) {
          setIs2FARequired(Boolean(res.data.settings.enable2FA));
          if (res.data.settings.orgName) setOrgName(res.data.settings.orgName);
        }
      } catch (err) {
        console.error('Could not fetch public settings:', err);
      }
    };

    fetchSettings();
  }, []);

  if (user && !show2FA) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess('');

    if (is2FARequired) {
      setTempCredentials({ email, password });
      setShow2FA(true);
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (code2fa === '123456') {
        await login(tempCredentials.email, tempCredentials.password);
        navigate('/dashboard');
      } else {
        setError('Invalid verification code.');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess('');

    try {
      await resetPassword(resetEmail);
      setResetSuccess('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6b1d44] px-4">
      {/* Container Box */}
      <div className="w-full max-w-195 h-auto md:h-120 bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Sidebar Accent Controls */}
        <div className="w-full md:w-[38%] bg-linear-to-br from-[#8a164b] to-[#690b31] relative flex flex-col justify-between overflow-hidden py-6 md:py-0">
          <div className="absolute inset-0 bg-white/10 rotate-45 -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"></div>
          <div className="absolute inset-0 bg-black/5 rotate-30 -top-1/2 left-[-80%] w-[200%] h-[200%] pointer-events-none"></div>
          
          {/* Brand Header Container (Logo left with text-foundation yellow on right side) */}
          <div className="px-6 py-6 border-b border-white/10 bg-black/10 z-10 w-full">
            <div className="flex flex-row items-center gap-4">
              <img 
                alt="Amaanitvam Foundation" 
                className="brand-logo h-12 w-12 object-contain bg-white p-1 rounded-xl shadow-md shrink-0" 
                src="assets/images/logo.jpg" 
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-heading font-black text-white tracking-tight leading-none uppercase">
                  {orgName.split(' ')[0] || 'Amaanitvam'}
                </h1>
                <p className="text-[10px] font-ui text-yellow-500 uppercase tracking-[0.2em] font-bold mt-1.5 leading-none">
                  {orgName.split(' ').slice(1).join(' ') || 'Foundation'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Nav Actions */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-6 w-full z-10 my-auto">
            <button
              type="button"
              disabled={show2FA}
              onClick={() => { setShowReset(false); setError(''); setResetSuccess(''); }}
              className={`text-sm md:text-base font-bold uppercase tracking-wider py-3 px-6 text-center md:text-right w-full cursor-pointer transition-all duration-300 relative disabled:opacity-40 ${
                !showReset && !show2FA
                  ? 'text-black bg-white rounded-xl md:rounded-l-full md:rounded-r-none md:w-[75%] md:ml-auto shadow-md' 
                  : 'text-white/70 hover:text-white bg-transparent'
              }`}
            >
              Sign In
              {!showReset && !show2FA && (
                <>
                  <div className="hidden md:block absolute -top-5 right-0 w-5 h-5 bg-transparent rounded-br-2xl shadow-[5px_5px_0_0_#fff]" />
                  <div className="hidden md:block absolute -bottom-5 right-0 w-5 h-5 bg-transparent rounded-tr-2xl shadow-[5px_-5px_0_0_#fff]" />
                </>
              )}
            </button>

            <button
              type="button"
              disabled={show2FA}
              onClick={() => { setShowReset(true); setError(''); }}
              className={`text-sm md:text-base font-bold uppercase tracking-wider py-3 px-6 text-center md:text-right w-full cursor-pointer transition-all duration-300 relative disabled:opacity-40 ${
                showReset && !show2FA
                  ? 'text-black bg-white rounded-xl md:rounded-l-full md:rounded-r-none md:w-[75%] md:ml-auto shadow-md' 
                  : 'text-white/70 hover:text-white bg-transparent'
              }`}
            >
              Reset
              {showReset && !show2FA && (
                <>
                  <div className="hidden md:block absolute -top-5 right-0 w-5 h-5 bg-transparent rounded-br-2xl shadow-[5px_5px_0_0_#fff]" />
                  <div className="hidden md:block absolute -bottom-5 right-0 w-5 h-5 bg-transparent rounded-tr-2xl shadow-[5px_-5px_0_0_#fff]" />
                </>
              )}
            </button>
          </div>
          
          <div className="hidden md:block h-12" />
        </div>

        {/* Right Form Component Body */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
          <div className="w-full flex flex-col items-center">
            
            {/* Form Upper Details Header Block */}
            <div className="text-center mb-6 w-full max-w-[320px]">
              <p className="text-xs font-ui font-bold uppercase tracking-[0.22em] text-[#8a164b] mb-1">
                Dashboard Panel
              </p>
              <h2 className="text-[#690b31] text-2xl font-black tracking-widest uppercase">
                {show2FA ? 'Two-Factor Authentication' : !showReset ? ' Dashboard Login' : 'Reset Password'}
              </h2>
            </div>

            {error && (
              <div className="w-full max-w-[320px] bg-red-50 text-red-600 text-xs p-2.5 rounded-lg border border-red-100 mb-4 text-center">
                {error}
              </div>
            )}
            
            {resetSuccess && (
              <div className="w-full max-w-[320px] bg-green-50 text-green-700 text-xs p-2.5 rounded-lg border border-green-100 mb-4 text-center">
                {resetSuccess}
              </div>
            )}

            {show2FA ? (
              /* Two-Factor Authentication View Form */
              <form onSubmit={handleVerify2FA} className="w-full max-w-[320px] flex flex-col items-center">
                <p className="text-xs text-slate-500 text-center mb-4 leading-relaxed">
                  Enter the verification code sent to your registered device.
                  <br />
                  <span className="text-[10px] text-slate-400 font-medium">
                    Demo code: 123456
                  </span>
                </p>
                
                <div className="w-full relative mb-6">
                  <input
                    type="text"
                    required
                    value={code2fa}
                    onChange={(e) => setCode2fa(e.target.value)}
                    className="w-full border-b border-slate-200 py-2 text-center text-xl tracking-[0.3em] font-bold text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShow2FA(false);
                      setTempCredentials(null);
                      setCode2fa('');
                      setError('');
                    }}
                    className="text-xs text-slate-400 hover:text-[#690b31] bg-transparent transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Login
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-linear-to-r from-[#8a164b] to-[#690b31] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                  </button>
                </div>
              </form>
            ) : !showReset ? (
              /* Standard Login Sign In View Form */
              <form onSubmit={handleLogin} className="w-full max-w-[320px] flex flex-col items-center">
                <div className="w-full relative mb-5">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@amaanitvam.org"
                    required
                    className="w-full border-b border-slate-200 py-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent placeholder-slate-300"
                  />
                </div>

                <div className="w-full relative mb-6">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full border-b border-slate-200 py-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent placeholder-slate-300"
                  />
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReset(true);
                      setError('');
                    }}
                    className="text-xs text-slate-400 hover:text-[#a94276] bg-transparent transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-linear-to-r from-[#8a164b] to-[#690b31] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Signing in…' : 'Sign In'}
                  </button>
                </div>
              </form>
            ) : (
              /* Password Reset Link View Form */
              <form onSubmit={handleResetPassword} className="w-full max-w-[320px] flex flex-col items-center">
                <div className="w-full relative mb-6">
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@amaanitvam.org"
                    required
                    className="w-full border-b border-slate-200 py-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent placeholder-slate-300"
                  />
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReset(false);
                      setError('');
                      setResetSuccess('');
                    }}
                    className="text-xs text-slate-400 hover:text-[#690b31] bg-transparent transition-colors cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-linear-to-r from-[#8a164b] to-[#690b31] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}