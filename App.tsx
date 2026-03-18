
import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
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
import { SiteData, ActiveTab, SiteSettings, PortfolioItem, ServiceItem, Testimonial, FAQItem } from './types.ts';
import { INITIAL_DATA } from './constants.ts';
import { db, auth } from './firebase.ts';
import { onSnapshot, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">문제가 발생했습니다</h1>
            <p className="text-slate-600 mb-6">
              {this.state.error?.message.startsWith('{') 
                ? "데이터베이스 권한 오류가 발생했습니다. 관리자에게 문의하세요."
                : "앱을 실행하는 중 오류가 발생했습니다."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              새로고침
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-6 p-4 bg-slate-100 rounded-lg text-left text-xs overflow-auto max-h-40">
                {this.state.error?.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthReady(true);
      if (!user) {
        setIsAuthorized(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore Real-time Sync
  useEffect(() => {
    setLoading(true);
    
    // Sync Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(prev => ({ ...prev, settings: docSnap.data() as SiteSettings }));
      } else {
        // Initialize with default if not exists
        setDoc(doc(db, 'settings', 'global'), INITIAL_DATA.settings);
      }
    }, (error) => console.error("Settings sync error:", error));

    // Sync Portfolio
    const unsubPortfolio = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as PortfolioItem);
      setSiteData(prev => ({ ...prev, portfolio: items }));
      if (items.length === 0 && INITIAL_DATA.portfolio.length > 0) {
        // Seed data if empty (optional, maybe only for first run)
      }
    });

    // Sync Services
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as ServiceItem);
      setSiteData(prev => ({ ...prev, services: items }));
    });

    // Sync Testimonials
    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as Testimonial);
      setSiteData(prev => ({ ...prev, testimonials: items }));
    });

    // Sync FAQ
    const unsubFAQ = onSnapshot(collection(db, 'faq'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as FAQItem);
      setSiteData(prev => ({ ...prev, faq: items }));
      setLoading(false);
    });

    return () => {
      unsubSettings();
      unsubPortfolio();
      unsubServices();
      unsubTestimonials();
      unsubFAQ();
    };
  }, []);

  useEffect(() => {
    document.title = siteData.settings.metaTitle || "JoyWeb CMS";
  }, [siteData.settings.metaTitle]);

  const handleUpdateData = (newData: SiteData) => {
    // This will be handled by AdminDashboard directly updating Firestore
    // But we keep it for local state if needed
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
