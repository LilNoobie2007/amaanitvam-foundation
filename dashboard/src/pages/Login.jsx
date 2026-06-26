import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
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

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-[#56051a] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-[#56051a] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#56051a]/30">
            <LayoutDashboard className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Amaanitvam Foundation</h1>
          <p className="text-sm text-slate-500 mt-1">Team Dashboard</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 mb-4">{error}</div>}
        {resetSuccess && <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl border border-green-100 mb-4">{resetSuccess}</div>}

        {!showReset ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@amaanitvam.org" required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a] transition-all" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a] transition-all" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#56051a] hover:bg-[#7a1e3a] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
            <div className="text-center pt-1">
              <button type="button" onClick={() => { setShowReset(true); setError(''); }} className="text-sm text-[#56051a] font-semibold hover:underline bg-transparent border-none cursor-pointer">Forgot Password?</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input id="reset-email" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="you@amaanitvam.org" required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a] transition-all" />
            </div>
            <button type="submit" className="w-full py-3 bg-[#56051a] hover:bg-[#7a1e3a] text-white font-semibold rounded-xl transition-all duration-200">Send Reset Link</button>
            <div className="text-center pt-1">
              <button type="button" onClick={() => { setShowReset(false); setError(''); setResetSuccess(''); }} className="text-sm text-[#56051a] font-semibold hover:underline bg-transparent border-none cursor-pointer">Back to Sign In</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
