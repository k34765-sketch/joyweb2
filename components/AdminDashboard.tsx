
import React, { useState } from 'react';
import { 
  X, Layout, FileText, Image as ImageIcon, MessageSquare, Settings as SettingsIcon, Save, Plus, Trash2, 
  BarChart3, Users, MousePointer2, TrendingUp, Star, HelpCircle, Lock, Eye, EyeOff, Link as LinkIcon
} from 'lucide-react';
import { SiteData, PortfolioItem, ServiceItem, FAQItem, Testimonial } from '../types.ts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
  onClose: () => void;
}

const analyticsData = [
  { name: 'Mon', uv: 4000, pv: 2400 },
  { name: 'Tue', uv: 3000, pv: 1398 },
  { name: 'Wed', uv: 2000, pv: 9800 },
  { name: 'Thu', uv: 2780, pv: 3908 },
  { name: 'Fri', uv: 1890, pv: 4800 },
  { name: 'Sat', uv: 2390, pv: 3800 },
  { name: 'Sun', uv: 3490, pv: 4300 },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, onUpdate, onClose }) => {
  const [activeMenu, setActiveMenu] = useState<'stats' | 'settings' | 'portfolio' | 'services' | 'faq' | 'testimonials'>('stats');
  const [localData, setLocalData] = useState<SiteData>(siteData);
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보임 상태 관리

  const handleSave = () => {
    onUpdate(localData);
    alert('모든 설정이 성공적으로 저장되었습니다!');
  };

  const updateSettings = (key: keyof typeof localData.settings, value: string) => {
    setLocalData({
      ...localData,
      settings: { ...localData.settings, [key]: value }
    });
  };

  // --- Render Functions ---

  const renderStats = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '주간 방문자', value: '12,540', icon: <Users />, color: 'bg-blue-500', trend: '+12%' },
          { label: '총 문의 수', value: '458', icon: <MessageSquare />, color: 'bg-teal-500', trend: '+5%' },
          { label: '페이지 뷰', value: '45,200', icon: <MousePointer2 />, color: 'bg-indigo-500', trend: '+8%' },
          { label: '전환율', value: '3.2%', icon: <TrendingUp />, color: 'bg-orange-500', trend: '+0.5%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} text-white`}>{stat.icon}</div>
              <span className="text-xs font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
          <BarChart3 className="text-teal-600" /> 트래픽 분석 (7일 기준)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="pv" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-12 animate-in slide-in-from-right duration-300">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <SettingsIcon className="text-teal-600" /> 기본 사이트 정보 및 SNS 설정
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">사이트 이름</label>
            <input value={localData.settings.siteName} onChange={(e) => updateSettings('siteName', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">SEO 제목</label>
            <input value={localData.settings.metaTitle} onChange={(e) => updateSettings('metaTitle', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">티스토리 URL</label>
            <input value={localData.settings.tistoryUrl} onChange={(e) => updateSettings('tistoryUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">카카오톡 URL</label>
            <input value={localData.settings.kakaoUrl} onChange={(e) => updateSettings('kakaoUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">블로그 URL</label>
            <input value={localData.settings.blogUrl} onChange={(e) => updateSettings('blogUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Lock className="text-teal-600" /> 관리자 보안 설정
        </h3>
        <div className="max-w-md space-y-4">
          <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl text-teal-800 text-sm">
            <p className="font-bold mb-1">비밀번호 관리 안내</p>
            <p className="opacity-80">여기서 변경하신 비밀번호는 다음 관리자 페이지 로그인부터 적용됩니다. 변경 후 꼭 저장을 눌러주세요.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">CMS 관리자 비밀번호</label>
            <div className="flex gap-4 relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={localData.settings.adminPassword} 
                onChange={(e) => updateSettings('adminPassword', e.target.value)} 
                placeholder="020708"
                className="flex-grow px-4 py-3 pr-12 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500 font-bold tracking-[0.2em] text-center text-teal-700 transition-all" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-teal-600 transition-colors"
                title={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioManager = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">포트폴리오 관리</h3>
        <button onClick={() => setLocalData({...localData, portfolio: [{id: Date.now().toString(), title: '신규 프로젝트', category: '기타', imageUrl: 'https://picsum.photos/800/600', description: '', link: ''}, ...localData.portfolio]})} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700"><Plus size={18} /> 새 항목</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localData.portfolio.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <img src={item.imageUrl} className="w-full h-32 object-cover rounded-xl bg-slate-100" alt="" />
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">제목</label>
                <input value={item.title} onChange={(e) => setLocalData({...localData, portfolio: localData.portfolio.map(p => p.id === item.id ? {...p, title: e.target.value} : p)})} className="w-full px-3 py-2 text-sm font-bold bg-slate-50 border border-transparent rounded-lg focus:border-teal-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">이미지 URL</label>
                <div className="flex gap-2">
                   <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><ImageIcon size={14}/></div>
                   <input value={item.imageUrl} onChange={(e) => setLocalData({...localData, portfolio: localData.portfolio.map(p => p.id === item.id ? {...p, imageUrl: e.target.value} : p)})} className="flex-grow px-3 py-1 text-xs text-slate-500 bg-slate-50 border border-transparent rounded-lg focus:border-teal-500 outline-none" placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">연결 링크 (URL)</label>
                <div className="flex gap-2">
                   <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><LinkIcon size={14}/></div>
                   <input value={item.link || ''} onChange={(e) => setLocalData({...localData, portfolio: localData.portfolio.map(p => p.id === item.id ? {...p, link: e.target.value} : p)})} className="flex-grow px-3 py-1 text-xs text-teal-600 bg-teal-50 border border-transparent rounded-lg focus:border-teal-500 outline-none font-medium" placeholder="https://..." />
                </div>
              </div>
            </div>
            <button onClick={() => setLocalData({...localData, portfolio: localData.portfolio.filter(p => p.id !== item.id)})} className="w-full py-2 text-red-500 text-xs font-bold flex items-center justify-center gap-1 hover:bg-red-50 rounded-lg transition-colors mt-2"><Trash2 size={14} /> 삭제하기</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesManager = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">서비스 관리</h3>
        <button onClick={() => setLocalData({...localData, services: [...localData.services, {id: Date.now().toString(), title: '새 서비스', description: '내용을 입력하세요.', icon: 'Zap'}]})} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700"><Plus size={18} /> 새 항목</button>
      </div>
      <div className="space-y-4">
        {localData.services.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-6 items-start">
            <div className="p-4 bg-teal-50 rounded-xl text-teal-600"><Layout size={24} /></div>
            <div className="flex-grow space-y-3">
              <input value={item.title} onChange={(e) => setLocalData({...localData, services: localData.services.map(s => s.id === item.id ? {...s, title: e.target.value} : s)})} className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-teal-500" />
              <textarea value={item.description} onChange={(e) => setLocalData({...localData, services: localData.services.map(s => s.id === item.id ? {...s, description: e.target.value} : s)})} className="w-full text-sm text-slate-500 outline-none bg-slate-50 p-3 rounded-lg h-20" />
            </div>
            <button onClick={() => setLocalData({...localData, services: localData.services.filter(s => s.id !== item.id)})} className="text-red-400 p-2"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFAQManager = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">FAQ 관리</h3>
        <button onClick={() => setLocalData({...localData, faq: [...localData.faq, {id: Date.now().toString(), question: '질문이 무엇인가요?', answer: '답변을 입력하세요.'}]})} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700"><Plus size={18} /> 새 항목</button>
      </div>
      <div className="space-y-4">
        {localData.faq.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex gap-2 items-center text-teal-600 font-bold"><HelpCircle size={18} /> 질문</div>
            <input value={item.question} onChange={(e) => setLocalData({...localData, faq: localData.faq.map(f => f.id === item.id ? {...f, question: e.target.value} : f)})} className="w-full outline-none p-2 rounded bg-slate-50 font-medium" />
            <div className="flex gap-2 items-center text-slate-400 font-bold">답변</div>
            <textarea value={item.answer} onChange={(e) => setLocalData({...localData, faq: localData.faq.map(f => f.id === item.id ? {...f, answer: e.target.value} : f)})} className="w-full outline-none p-2 rounded bg-slate-50 text-slate-600 h-24" />
            <button onClick={() => setLocalData({...localData, faq: localData.faq.filter(f => f.id !== item.id)})} className="text-red-500 text-xs font-bold flex items-center gap-1 pt-2"><Trash2 size={14} /> 항목 제거</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsManager = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">고객 후기 관리</h3>
        <button onClick={() => setLocalData({...localData, testimonials: [...localData.testimonials, {id: Date.now().toString(), name: '이름', company: '업체명', content: '내용', rating: 5}]})} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700"><Plus size={18} /> 새 항목</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {localData.testimonials.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4 relative">
             <div className="flex text-yellow-400"><Star size={14} className="fill-yellow-400" /> <Star size={14} className="fill-yellow-400" /> <Star size={14} className="fill-yellow-400" /></div>
             <textarea value={item.content} onChange={(e) => setLocalData({...localData, testimonials: localData.testimonials.map(t => t.id === item.id ? {...t, content: e.target.value} : t)})} className="w-full text-sm italic text-slate-600 outline-none h-24 border-b focus:border-teal-500" />
             <div className="flex gap-4">
                <input value={item.name} onChange={(e) => setLocalData({...localData, testimonials: localData.testimonials.map(t => t.id === item.id ? {...t, name: e.target.value} : t)})} placeholder="이름" className="w-1/2 text-sm font-bold outline-none border rounded px-2 py-1" />
                <input value={item.company} onChange={(e) => setLocalData({...localData, testimonials: localData.testimonials.map(t => t.id === item.id ? {...t, company: e.target.value} : t)})} placeholder="회사" className="w-1/2 text-sm outline-none border rounded px-2 py-1" />
             </div>
             <button onClick={() => setLocalData({...localData, testimonials: localData.testimonials.filter(t => t.id !== item.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col p-8 space-y-12">
        <h1 className="text-2xl font-black text-teal-800 tracking-tighter">JoyWeb CMS</h1>
        <nav className="flex-grow space-y-2">
          {[
            { id: 'stats', label: '대시보드 통계', icon: <BarChart3 size={20} /> },
            { id: 'settings', label: '기본 설정 & 보안', icon: <SettingsIcon size={20} /> },
            { id: 'portfolio', label: '포트폴리오 편집', icon: <ImageIcon size={20} /> },
            { id: 'services', label: '서비스 관리', icon: <Layout size={20} /> },
            { id: 'testimonials', label: '고객 후기', icon: <MessageSquare size={20} /> },
            { id: 'faq', label: '자주 묻는 질문', icon: <FileText size={20} /> },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveMenu(item.id as any)} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all ${activeMenu === item.id ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' : 'text-slate-500 hover:bg-teal-50 hover:text-teal-600'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button onClick={onClose} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">
          <X size={20} /> 미리보기로 돌아가기
        </button>
      </aside>
      <main className="flex-grow p-8 md:p-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {activeMenu === 'stats' && '비즈니스 인사이트'}
              {activeMenu === 'settings' && '사이트 설정 & 보안'}
              {activeMenu === 'portfolio' && '프로젝트 갤러리'}
              {activeMenu === 'services' && '서비스 구성'}
              {activeMenu === 'testimonials' && '클라이언트 리뷰'}
              {activeMenu === 'faq' && '고객 지원 센터'}
            </h2>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all">
            <Save size={20} /> 변경사항 저장하기
          </button>
        </div>
        <div className="pb-12">
          {activeMenu === 'stats' && renderStats()}
          {activeMenu === 'settings' && renderSettings()}
          {activeMenu === 'portfolio' && renderPortfolioManager()}
          {activeMenu === 'services' && renderServicesManager()}
          {activeMenu === 'testimonials' && renderTestimonialsManager()}
          {activeMenu === 'faq' && renderFAQManager()}
        </div>
      </main>
    </div>
  );
};
