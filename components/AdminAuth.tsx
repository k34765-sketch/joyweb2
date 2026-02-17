
import React, { useState } from 'react';
import { Lock, ArrowRight, X, AlertCircle } from 'lucide-react';

interface AdminAuthProps {
  correctPassword?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ correctPassword, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const inputVal = password.trim();
    // 상위에서 넘어온 비번 혹은 강제 고정 비번 '020708'과 비교
    const targetVal = (correctPassword || '020708').trim();

    if (inputVal === targetVal || inputVal === '020708') {
      onSuccess();
    } else {
      setError(true);
      setPassword(''); // 틀리면 입력창 비우기
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${error ? 'translate-x-1 animate-shake' : ''}`}>
        <div className="bg-teal-600 p-8 text-center text-white relative">
          <button onClick={onCancel} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">관리자 인증</h2>
          <p className="text-white/70 text-sm mt-1">JoyWeb CMS 보안을 위해 비밀번호가 필요합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
              {error && <span className="text-red-500 text-[10px] font-black animate-pulse">틀린 비밀번호입니다.</span>}
            </div>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
              className={`w-full px-5 py-4 rounded-xl bg-slate-50 border-2 outline-none transition-all text-center text-2xl tracking-[0.5em] font-mono ${
                error 
                  ? 'border-red-500 bg-red-50 text-red-600' 
                  : 'border-transparent focus:border-teal-500 focus:bg-white text-slate-900'
              }`}
            />
          </div>

          <div className="flex gap-3">
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-100 transition-colors"
            >
              취소
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100 active:scale-95"
            >
              인증하기 <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};
