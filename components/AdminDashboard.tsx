
import React, { useState } from 'react';
import { 
  X, Layout, FileText, Image as ImageIcon, MessageSquare, Settings as SettingsIcon, Save, Plus, Trash2, 
  BarChart3, Users, MousePointer2, TrendingUp 
} from 'lucide-react';
import { SiteData, PortfolioItem, ServiceItem, FAQItem, Testimonial } from '../types.ts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
  onClose: () => void;
}

const analyticsData = [
  { name: 'Mon', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Tue', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Wed', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Thu', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Fri', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Sat', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Sun', uv: 3490, pv: 4300, amt: 2100 },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ siteData, onUpdate, onClose }) => {
  const [activeMenu, setActiveMenu] = useState<'stats' | 'settings' | 'portfolio' | 'services' | 'faq' | 'testimonials'>('stats');
  const [localData, setLocalData] = useState<SiteData>(siteData);

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
              <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                {stat.icon}
              </div>
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
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="pv" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-right duration-300">
      <h3 className="text-xl font-black text-slate-900 mb-6">기본 사이트 정보 및 SEO</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">사이트 이름</label>
          <input 
            value={localData.settings.siteName}
            onChange={(e) => updateSettings('siteName', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">SEO 제목 (메타태그)</label>
          <input 
            value={localData.settings.metaTitle}
            onChange={(e) => updateSettings('metaTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">메인 히어로 타이틀</label>
          <input 
            value={localData.settings.heroTitle}
            onChange={(e) => updateSettings('heroTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">메인 히어로 설명</label>
          <textarea 
            value={localData.settings.heroSubtitle}
            onChange={(e) => updateSettings('heroSubtitle', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-teal-500 h-24 resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderPortfolioManager = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">포트폴리오 관리</h3>
        <button 
          onClick={() => {
            const newItem: PortfolioItem = {
              id: Date.now().toString(),
              title: '새 프로젝트',
              category: '기타',
              imageUrl: 'https://picsum.photos/800/600',
              description: '설명을 입력해 주세요.'
            };
            setLocalData({...localData, portfolio: [newItem, ...localData.portfolio]});
          }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700"
        >
          <Plus size={18} /> 새 항목 추가
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localData.portfolio.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <img src={item.imageUrl} className="w-full h-40 object-cover rounded-2xl" alt="" />
            <input 
              value={item.title}
              onChange={(e) => {
                const updated = localData.portfolio.map(p => p.id === item.id ? {...p, title: e.target.value} : p);
                setLocalData({...localData, portfolio: updated});
              }}
              className="w-full px-3 py-2 text-lg font-bold outline-none border-b border-slate-100 focus:border-teal-500"
            />
            <select 
              value={item.category}
              onChange={(e) => {
                const updated = localData.portfolio.map(p => p.id === item.id ? {...p, category: e.target.value} : p);
                setLocalData({...localData, portfolio: updated});
              }}
              className="w-full px-3 py-2 bg-slate-50 rounded-lg text-sm outline-none"
            >
              <option>브랜드 디자인</option>
              <option>웹 디자인</option>
              <option>앱 디자인</option>
              <option>기타</option>
            </select>
            <button 
              onClick={() => setLocalData({...localData, portfolio: localData.portfolio.filter(p => p.id !== item.id)})}
              className="flex items-center gap-2 text-red-500 text-xs font-bold hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={14} /> 이 프로젝트 삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col p-8 space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-teal-800 tracking-tighter">JoyWeb CMS</h1>
        </div>
        
        <nav className="flex-grow space-y-2">
          {[
            { id: 'stats', label: '대시보드 통계', icon: <BarChart3 size={20} /> },
            { id: 'settings', label: '기본 설정 & SEO', icon: <SettingsIcon size={20} /> },
            { id: 'portfolio', label: '포트폴리오 편집', icon: <ImageIcon size={20} /> },
            { id: 'services', label: '서비스 관리', icon: <Layout size={20} /> },
            { id: 'testimonials', label: '고객 후기', icon: <MessageSquare size={20} /> },
            { id: 'faq', label: '자주 묻는 질문', icon: <FileText size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeMenu === item.id 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-100' 
                  : 'text-slate-500 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            <X size={20} /> 미리보기로 돌아가기
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-grow p-8 md:p-12 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {activeMenu === 'stats' && '비즈니스 인사이트'}
              {activeMenu === 'settings' && '사이트 환경 설정'}
              {activeMenu === 'portfolio' && '프로젝트 갤러리'}
              {activeMenu === 'services' && '서비스 구성'}
              {activeMenu === 'testimonials' && '클라이언트 리뷰'}
              {activeMenu === 'faq' && '고객 지원 센터'}
            </h2>
            <p className="text-slate-500 mt-1">코딩 없이 모든 정보를 실시간으로 수정하세요.</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all active:scale-95"
          >
            <Save size={20} /> 변경사항 저장하기
          </button>
        </div>

        <div className="pb-12">
          {activeMenu === 'stats' && renderStats()}
          {activeMenu === 'settings' && renderSettings()}
          {activeMenu === 'portfolio' && renderPortfolioManager()}
          {activeMenu === 'services' && (
            <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-300">
              서비스 관리 기능이 곧 업데이트 됩니다.
            </div>
          )}
          {activeMenu === 'testimonials' && (
             <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-300">
              고객 후기 관리 기능이 곧 업데이트 됩니다.
            </div>
          )}
          {activeMenu === 'faq' && (
             <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-300">
              FAQ 관리 기능이 곧 업데이트 됩니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
