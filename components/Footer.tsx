
import React from 'react';
import { Instagram, MessageCircle, Rss } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-white">{settings.siteName}</h2>
            <p className="max-w-md leading-relaxed break-keep">
              우리는 단순한 디자인을 넘어 비즈니스의 성장과 고객의 즐거움을 설계합니다. <br/>
              대한민국 최고의 로고 및 웹 전문 디자인 스튜디오.
            </p>
            <div className="flex gap-4">
              <a href={settings.instagramUrl} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href={settings.kakaoUrl} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                <MessageCircle size={20} />
              </a>
              <a href={settings.blogUrl} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">
                <Rss size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-teal-400 transition-colors">Portfolio</a></li>
              <li><a href="#process" className="hover:text-teal-400 transition-colors">Work Process</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Office Info</h4>
            <p className="text-sm leading-relaxed">
              {settings.address} <br/>
              T. {settings.contactPhone} <br/>
              E. {settings.contactEmail}
            </p>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {settings.siteName} All Rights Reserved. Business License: 123-45-67890</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white font-bold">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
