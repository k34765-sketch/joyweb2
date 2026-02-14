
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-50 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center py-12">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold tracking-wide">
            DESIGN & DEVELOPMENT STUDIO
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.15] break-keep">
            {settings.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg break-keep">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center gap-2 shadow-lg shadow-teal-200"
            >
              무료 상담 시작하기 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              포트폴리오 보기
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
            <img 
              src={settings.heroImage} 
              alt="JoyWeb Design" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                <span className="text-xl font-bold">10+</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Years of Excellence</div>
                <div className="text-xs text-slate-500">Industry Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
