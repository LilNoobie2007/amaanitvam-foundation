import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Shield, User, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const { user, login, resetPassword } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
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
        <div className="w-full md:w-[35%] bg-linear-to-br from-[#8a164b] to-[#690b31] relative flex flex-row md:flex-col justify-center items-center md:items-end overflow-hidden py-6 md:py-0">
          <div className="absolute inset-0 bg-white/10 rotate-45 -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"></div>
          <div className="absolute inset-0 bg-black/5 rotate-30 -top-1/2 left-[-80%] w-[200%] h-[200%] pointer-events-none"></div>
          
          <div className="flex flex-row md:flex-col gap-4 md:gap-6 w-full z-10">
            <button
              type="button"
              onClick={() => { setShowReset(false); setError(''); setResetSuccess(''); }}
              className={`text-sm md:text-base font-bold uppercase tracking-wider py-3 px-6 text-center md:text-right w-full cursor-pointer transition-all duration-300 relative ${
                !showReset 
                  ? 'text-black bg-white rounded-xl md:rounded-l-full md:rounded-r-none md:w-[75%] md:ml-auto shadow-md' 
                  : 'text-white/70 hover:text-white bg-transparent'
              }`}
            >
              Login
              {!showReset && (
                <>
                  <div className="hidden md:block absolute -top-5 right-0 w-5 h-5 bg-transparent rounded-br-2xl shadow-[5px_5px_0_0_#fff]" />
                  <div className="hidden md:block absolute -bottom-5 right-0 w-5 h-5 bg-transparent rounded-tr-2xl shadow-[5px_-5px_0_0_#fff]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setShowReset(true); setError(''); }}
              className={`text-sm md:text-base font-bold uppercase tracking-wider py-3 px-6 text-center md:text-right w-full cursor-pointer transition-all duration-300 relative ${
                showReset 
                  ? 'text-black bg-white rounded-xl md:rounded-l-full md:rounded-r-none md:w-[75%] md:ml-auto shadow-md' 
                  : 'text-white/70 hover:text-white bg-transparent'
              }`}
            >
              Reset
              {showReset && (
                <>
                  <div className="hidden md:block absolute -top-5 right-0 w-5 h-5 bg-transparent rounded-br-2xl shadow-[5px_5px_0_0_#fff]" />
                  <div className="hidden md:block absolute -bottom-5 right-0 w-5 h-5 bg-transparent rounded-tr-2xl shadow-[5px_-5px_0_0_#fff]" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Form Component Body */}
        <div className="flex-1 flex flex-col justify-between p-8 md:p-10">
          <div className="w-full flex flex-col items-center">
            <div className="w-16 h-16 bg-linear-to-b from-white to-slate-50 rounded-full flex items-center justify-center mb-3 shadow-lg border border-[#6b1d44]/10">
              <Shield className="w-7 h-7 text-[#8a164b]" />
            </div>
            
            <h2 className="text-[#6b1d44] text-xl font-extrabold tracking-widest uppercase mb-6">
              {!showReset ? 'Login' : 'Reset Password'}
            </h2>

            {error && (
              <div className="w-full max-w-[320px] bg-red-50 text-red-600 text-xs p-2.5 rounded-lg border border-red-100 mb-4 text-center">
                {error}
              </div>
            )}
            {resetSuccess && (
              <div className="w-full max-w-[320px] bg-green-50 text-green-600 text-xs p-2.5 rounded-lg border border-green-100 mb-4 text-center">
                {resetSuccess}
              </div>
            )}

            {!showReset ? (
              <form onSubmit={handleLogin} className="w-full max-w-[320px] flex flex-col items-center">
                <div className="w-full relative mb-5">
                  <User className="absolute left-1 bottom-2 text-slate-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border-b border-slate-200 py-2 pl-8 pr-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent"
                  />
                </div>

                <div className="w-full relative mb-6">
                  <Lock className="absolute left-1 bottom-2 text-slate-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border-b border-slate-200 py-2 pl-8 pr-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent"
                  />
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setError(''); }}
                    className="text-xs text-slate-400 hover:text-[#a94276] bg-transparent transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-linear-to-r from-[#8a164b] to-[#690b31] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Signing in…' : 'Login'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="w-full max-w-[320px] flex flex-col items-center">
                <div className="w-full relative mb-6">
                  <Mail className="absolute left-1 bottom-2 text-slate-400 w-5 h-5" />
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full border-b border-slate-200 py-2 pl-8 pr-2 text-sm text-slate-800 outline-none focus:border-[#a94276] transition-colors bg-transparent"
                  />
                </div>

                <div className="w-full flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => { setShowReset(false); setError(''); setResetSuccess(''); }}
                    className="text-xs text-slate-400 hover:text-[#690b31] bg-transparent transition-colors cursor-pointer"
                  >
                    Back to Login
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-linear-to-r from-[#8a164b] to-[#690b31] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md hover:opacity-95 transition-all cursor-pointer"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Connected Social Action Footer Area */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-slate-700 mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-800 select-none">Or Login With</span>
            <div className="flex gap-4">
              {/* Google Button */}
              <span className="flex items-center gap-1 text-[11px] font-bold cursor-pointer hover:opacity-80 select-none">
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google
              </span>

              {/* Facebook Button */}
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#1877f2] cursor-pointer hover:opacity-80 select-none">
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}