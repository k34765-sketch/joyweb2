
import React from 'react';
import { Palette, Monitor, Compass, Zap, Shield, Globe } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette size={32} />,
  Monitor: <Monitor size={32} />,
  Compass: <Compass size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Globe: <Globe size={32} />,
};

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">OUR SERVICES</h2>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900">귀하의 비즈니스를 위한 맞춤형 솔루션</h3>
        <p className="text-slate-600">전문적인 시각과 독창적인 창의성으로 최상의 결과물을 선사합니다.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              {iconMap[service.icon] || <Zap size={32} />}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
            <p className="text-slate-600 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
