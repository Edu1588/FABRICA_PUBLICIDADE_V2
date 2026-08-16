import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Eye, EyeOff, ArrowRight, ShieldAlert, Sparkles, Key } from 'lucide-react';

interface EmBreveGateProps {
  onUnlock: () => void;
}

export const EmBreveGate: React.FC<EmBreveGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (password.trim() === '654321') {
      setIsSuccess(true);
      setErrorMsg('');
      sessionStorage.setItem('aforja_home_unlocked', 'true');
      setTimeout(() => {
        onUnlock();
      }, 500);
    } else {
      setIsShaking(true);
      setErrorMsg('Senha incorreta. Verifique e tente novamente.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errorMsg) setErrorMsg('');
    
    // Auto-unlock if user typed exact 6 digits
    if (val === '654321') {
      setIsSuccess(true);
      setErrorMsg('');
      sessionStorage.setItem('aforja_home_unlocked', 'true');
      setTimeout(() => {
        onUnlock();
      }, 400);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#08080a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Background ambient forge glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#ff4d16]/10 via-[#c46a1a]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* Main card container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-8 animate-fade-in">
        
        {/* Brand tag */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-outfit uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d16] animate-pulse" />
          Fábrica Publicidade • Em Construção
        </div>

        {/* Heading: EM BREVE */}
        <div className="space-y-3">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-[0.18em] uppercase drop-shadow-[0_0_35px_rgba(255,77,22,0.25)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Em Breve
          </h1>
          <p className="text-xs sm:text-sm font-light text-white/60 tracking-wider max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            Estamos forjando um novo portal e ecossistema digital.
          </p>
        </div>

        {/* Divider accent */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#ff4d16]/60 to-transparent" />

        {/* Password Form Box */}
        <div className="w-full bg-[#0e0e14]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
          
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-outfit uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#ff4d16]" />
              Acesso Restrito
            </label>
            <span className="text-[10px] font-mono text-white/40">
              {password.length}/6 dígitos
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`relative transition-transform ${isShaking ? 'animate-bounce' : ''}`}>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange}
                placeholder="Digite a senha..."
                maxLength={10}
                className={`w-full bg-[#050508] border ${
                  errorMsg 
                    ? 'border-red-500/60 focus:border-red-500' 
                    : isSuccess 
                    ? 'border-emerald-500/80 focus:border-emerald-500' 
                    : 'border-white/15 focus:border-[#ff4d16]'
                } rounded-xl px-4 py-3.5 text-center text-lg tracking-[0.2em] font-mono text-white placeholder:text-white/25 placeholder:text-sm placeholder:tracking-normal focus:outline-none transition-all`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center justify-center gap-1.5 text-red-400 text-xs font-outfit tracking-wide animate-fade-in">
                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-outfit tracking-wide animate-fade-in">
                <Unlock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Acesso autorizado! Abrindo site...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSuccess || !password}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-outfit text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                isSuccess
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-[#ff4d16] to-[#c46a1a] hover:from-[#ff5e2e] hover:to-[#d97720] text-white shadow-lg shadow-[#ff4d16]/20 active:scale-[0.98]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSuccess ? (
                <>
                  <Unlock className="w-4 h-4" /> Acessando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Acessar Site <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-[11px] font-outfit uppercase tracking-widest text-white/30">
          © Fábrica Publicidade • Todos os direitos reservados
        </div>

      </div>
    </div>
  );
};
