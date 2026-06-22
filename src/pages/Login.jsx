import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useApp } from '../contexts/AppContext.jsx';

export default function Login() {
  const { loginByPhone, findUserByEmailOrPhone } = useAuth();
  const { switchView } = useApp();

  const [phone, setPhone] = useState('');
  const [loginError, setLoginError] = useState('');

  function handleLogin() {
    setLoginError('');

    if (!/^\d{10}$/.test(phone)) {
      setLoginError('Enter a valid 10-digit mobile number');
      return;
    }

    const existing = findUserByEmailOrPhone(null, phone);

    if (!existing) {
      setLoginError('No account found with this number. Please register first.');
      return;
    }

    loginByPhone(phone);

    if (existing.role === 'admin') {
      switchView('adminDashboardView');
    } else if (existing.role === 'agent') {
      switchView('agentDashboardView');
    } else {
      switchView('clientDashboardView');
    }
  }

  return (
    <div className="w-full max-w-sm my-auto">
      <div className="text-center mb-8 flex flex-col items-center">
        <button
          onClick={() => switchView('landingView')}
          className="self-start mb-4 text-sm text-theme-muted hover:text-theme-brand flex items-center gap-1 transition-colors"
        >
          ← Back Home
        </button>

        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] shadow-lg flex items-center justify-center ring-4 ring-theme-light">
          <img src="/logo.png" alt="FinTech" className="w-11 h-11 rounded-full" />
        </div>
      </div>

      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-theme-primary">Welcome Back</h2>
          <p className="text-theme-muted text-sm mt-2">Sign in with your mobile number</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="label">Mobile Number</label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted text-sm font-medium">
                +91
              </span>

              <input
                type="tel"
                inputMode="numeric"
                required
                className="input-field !pl-12"
                placeholder="9876543210"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                  setLoginError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
              />
            </div>

            {loginError && (
              <p className="text-xs text-theme-error mt-1.5">
                {loginError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Login
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-theme-light text-center">
          <p className="text-theme-muted text-sm">
            New user?{' '}
            <button
              onClick={() => switchView('registerView')}
              className="text-theme-brand font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}