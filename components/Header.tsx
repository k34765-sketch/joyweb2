
import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  siteName: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, siteName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: '홈' },
    { id: 'services', label: '서비스' },
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'process', label: '프로세스' },
    { id: 'contact', label: '문의하기' },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <button 
          onClick={() => handleNavClick('home')}
          className="text-2xl font-black text-teal-800 tracking-tighter hover:opacity-80 transition-opacity"
        >
          {siteName}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeTab === item.id ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('admin')}
            className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
            title="관리자 페이지"
          >
            <Settings size={20} />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setActiveTab('admin')}
            className="p-2 text-slate-400"
          >
            <Settings size={20} />
          </button>
          <button 
            className="p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 p-4 md:hidden flex flex-col space-y-4 shadow-xl">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-lg font-semibold py-2 transition-colors ${
                activeTab === item.id ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
