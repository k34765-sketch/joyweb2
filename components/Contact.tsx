
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xykdwyav', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">CONTACT US</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900">함께 즐거운 디자인을 <br/> 시작해볼까요?</h3>
            <p className="text-lg text-slate-600 max-w-md">상세한 요구사항을 남겨주시면 영업일 기준 24시간 이내에 답변해 드립니다.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <Mail />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</div>
                <div className="text-lg font-bold text-slate-900">{settings.contactEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <Phone />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                <div className="text-lg font-bold text-slate-900">{settings.contactPhone}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                <MapPin />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Office</div>
                <div className="text-lg font-bold text-slate-900">{settings.address}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">성함 / 업체명</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="홍길동"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">연락처</label>
              <input 
                required
                name="phone"
                type="tel" 
                placeholder="010-0000-0000"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 transition-all outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">문의 서비스 선택</label>
            <select name="service" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 transition-all outline-none">
              <option value="logo">로고 디자인</option>
              <option value="website">웹사이트 제작</option>
              <option value="package">로고 + 홈페이지 패키지</option>
              <option value="other">기타 디자인 문의</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">문의 내용</label>
            <textarea 
              required
              name="message"
              rows={5}
              placeholder="프로젝트에 대해 간략히 설명해 주세요."
              className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-teal-500 transition-all outline-none resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              status === 'submitting' 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-100'
            }`}
          >
            {status === 'submitting' ? (
              <>전송 중... <Loader2 size={18} className="animate-spin" /></>
            ) : (
              <>상담 요청하기 <Send size={18} /></>
            )}
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={20} />
              <span className="text-sm font-bold">문의가 성공적으로 전달되었습니다! 곧 연락드리겠습니다.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <span className="text-sm font-bold">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
