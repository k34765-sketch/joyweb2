
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Process } from './components/Process.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Contact } from './components/Contact.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { AdminAuth } from './components/AdminAuth.tsx';
import { LegalPage } from './components/LegalPage.tsx';
import { SiteData, ActiveTab } from './types.ts';
import { INITIAL_DATA } from './constants.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAuthorized, setIsAuthorized] = useState(false); // 관리자 인증 여부
  const [siteData, setSiteData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('joyweb_site_data');
    if (!saved) return INITIAL_DATA;
    
    try {
      const parsed: SiteData = JSON.parse(saved);
      
      // 스키마 마이그레이션 및 비밀번호 동기화
      if (!parsed.settings) return INITIAL_DATA;
      
      // 중요: 저장된 비번이 없거나 이전 기본값이면 현재 코드의 비번(020708)으로 강제 업데이트
      const currentDefault = INITIAL_DATA.settings.adminPassword;
      if (parsed.settings.adminPassword === 'admin1234' || !parsed.settings.adminPassword) {
        parsed.settings.adminPassword = currentDefault;
      }
      
      return parsed;
    } catch (e) {
      console.error("Data load error:", e);
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('joyweb_site_data', JSON.stringify(siteData));
    document.title = siteData.settings.metaTitle;
  }, [siteData]);

  const handleUpdateData = (newData: SiteData) => {
    setSiteData(newData);
  };

  const renderContent = () => {
    if (activeTab === 'admin') {
      if (!isAuthorized) {
        return (
          <AdminAuth 
            // 사이트 데이터와 코드상의 마스터 비번 둘 다 전달
            correctPassword={siteData.settings.adminPassword || INITIAL_DATA.settings.adminPassword} 
            onSuccess={() => setIsAuthorized(true)} 
            onCancel={() => setActiveTab('home')}
          />
        );
      }
      return (
        <AdminDashboard 
          siteData={siteData} 
          onUpdate={handleUpdateData} 
          onClose={() => {
            setActiveTab('home');
            setIsAuthorized(false); 
          }}
        />
      );
    }

    if (activeTab === 'terms' || activeTab === 'privacy') {
      return <LegalPage type={activeTab} onBack={() => setActiveTab('home')} />;
    }

    return (
      <main className="pt-16">
        <section id="home">
          <Hero settings={siteData.settings} />
        </section>
        <section id="services" className="bg-slate-50">
          <Services services={siteData.services} />
        </section>
        <section id="portfolio">
          <Portfolio portfolio={siteData.portfolio} />
        </section>
        <section id="process" className="bg-slate-50">
          <Process />
        </section>
        <section id="testimonials">
          <Testimonials testimonials={siteData.testimonials} />
        </section>
        <section id="faq" className="bg-slate-50">
          <FAQ items={siteData.faq} />
        </section>
        <section id="contact">
          <Contact settings={siteData.settings} />
        </section>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {activeTab !== 'admin' && (
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          siteName={siteData.settings.siteName}
        />
      )}
      <div className="flex-grow">
        {renderContent()}
      </div>
      {activeTab !== 'admin' && (activeTab !== 'terms' && activeTab !== 'privacy') && (
        <Footer settings={siteData.settings} onNavigate={setActiveTab} />
      )}
    </div>
  );
};

export default App;
