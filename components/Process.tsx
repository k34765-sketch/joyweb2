
import React from 'react';
import { Search, PenTool, Code, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: '기획 & 분석',
    desc: '브랜드 가치 분석 및 전략 수립'
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: '디자인 설계',
    desc: '컨셉 도출 및 비주얼 아이덴티티 확정'
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: '개발 & 구현',
    desc: '최신 기술 스택을 활용한 고퀄리티 개발'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: '론칭 & 유지보수',
    desc: '최종 검수 및 안정적인 서비스 운영'
  }
];

export const Process: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">PROCESS</h2>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900">어떻게 만들어지나요?</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-4 relative">
        {/* Connection Line (Desktop) */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center text-center p-6">
            <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-xl shadow-slate-200/50 hover:border-teal-400 transition-colors">
              {step.icon}
            </div>
            <div className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-4">
              0{idx + 1}
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
            <p className="text-sm text-slate-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
