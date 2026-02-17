
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
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform ${error ? 'animate-bounce' : ''}`}>
        <div className="bg-teal-600 p-8 text-center text-white relative">
          <button onClick={onCancel} className="absolute top-4 right-4 text-white/50 hover:text-white">
            <X size={24} />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black">관리자 인증</h2>
          <p className="text-white/70 text-sm mt-1">CMS에 접근하려면 비밀번호를 입력하세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Administrator Password</label>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className={`w-full px-5 py-4 rounded-xl bg-slate-50 border-2 outline-none transition-all text-center text-xl tracking-[0.5em] ${
                error ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-teal-500 focus:bg-white'
              }`}
            />
            {error && (
              <div className="flex items-center justify-center gap-1 text-red-500 text-xs font-bold mt-2 animate-pulse">
                <AlertCircle size={14} /> 비밀번호가 올바르지 않습니다.
              </div>
            )}
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
              className="flex-[2] py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-100"
            >
              인증하기 <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
