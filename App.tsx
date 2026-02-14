
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';
import { SiteData, ActiveTab } from './types';
import { INITIAL_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [siteData, setSiteData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('joyweb_site_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('joyweb_site_data', JSON.stringify(siteData));
    // Update document title for SEO
    document.title = siteData.settings.metaTitle;
  }, [siteData]);

  const handleUpdateData = (newData: SiteData) => {
    setSiteData(newData);
  };

  const renderContent = () => {
    if (activeTab === 'admin') {
      return (
        <AdminDashboard 
          siteData={siteData} 
          onUpdate={handleUpdateData} 
          onClose={() => setActiveTab('home')}
        />
      );
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
      {activeTab !== 'admin' && (
        <Footer settings={siteData.settings} />
      )}
    </div>
  );
};

export default App;
