
import { SiteData } from './types.ts';

export const INITIAL_DATA: SiteData = {
  settings: {
    siteName: 'JoyWeb',
    primaryColor: '#008080',
    accentColor: '#006666',
    heroTitle: '비즈니스의 가치를 디자인하는 조이웹',
    heroSubtitle: '로고 디자인부터 홈페이지 제작까지, 감각적인 브랜드 아이덴티티를 완성합니다.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920',
    contactEmail: 'k34765@gmail.com',
    contactPhone: '01025103651',
    address: '인천광역시 강화군 선원면 충렬사로 73번길 78',
    instagramUrl: 'https://instagram.com/joyweb',
    kakaoUrl: 'https://pf.kakao.com/_joyweb',
    blogUrl: 'https://blog.naver.com/joyweb',
    metaTitle: '조이웹 - 로고 & 웹사이트 전문 에이전시',
    metaDescription: '세련된 디자인과 탄탄한 기술력으로 당신의 비즈니스를 한 단계 더 끌어올립니다.'
  },
  services: [
    {
      id: '1',
      title: '로고 & 브랜드 디자인',
      description: '기업의 철학과 가치를 담은 독창적인 심볼과 타이포그래피를 설계합니다.',
      icon: 'Palette'
    },
    {
      id: '2',
      title: '웹사이트 제작',
      description: '사용자 경험(UX)을 최우선으로 고려한 고성능 반응형 웹사이트를 개발합니다.',
      icon: 'Monitor'
    },
    {
      id: '3',
      title: 'UI/UX 컨설팅',
      description: '데이터를 기반으로 더 나은 인터랙션과 사용 편의성을 위한 가이드를 제공합니다.',
      icon: 'Compass'
    }
  ],
  portfolio: [
    {
      id: 'p1',
      title: '퓨처 테크놀로지 로고',
      category: '브랜드 디자인',
      imageUrl: 'https://picsum.photos/seed/tech/800/600',
      description: '미래지향적인 선을 강조한 IT 기업 아이덴티티 구축'
    },
    {
      id: 'p2',
      title: '카페 루미에르 웹사이트',
      category: '웹 디자인',
      imageUrl: 'https://picsum.photos/seed/cafe/800/600',
      description: '감성적인 무드와 예약 시스템이 통합된 커스텀 사이트'
    },
    {
      id: 'p3',
      title: '헬스케어 앱 UI',
      category: '앱 디자인',
      imageUrl: 'https://picsum.photos/seed/health/800/600',
      description: '직관적인 건강 데이터 관리 인터페이스 설계'
    },
    {
      id: 'p4',
      title: '모던 퍼니처 패키징',
      category: '그래픽 디자인',
      imageUrl: 'https://picsum.photos/seed/furniture/800/600',
      description: '친환경 소재와 미니멀리즘을 결합한 패키지 디자인'
    }
  ],
  testimonials: [
    {
      id: 't1',
      name: '김민수',
      company: '스타트업 A사 대표',
      content: '조이웹과 함께 작업하며 브랜드의 정체성이 확실해졌습니다. 소통이 매우 원활하고 결과물이 기대 이상이었습니다.',
      rating: 5
    },
    {
      id: 't2',
      name: '이지혜',
      company: '패션 브랜드 B 마케팅 팀장',
      content: '웹사이트의 속도가 빨라지고 디자인이 세련되어 매출 향상에 큰 도움이 되었습니다. 추천합니다!',
      rating: 5
    }
  ],
  faq: [
    {
      id: 'f1',
      question: '제작 기간은 얼마나 걸리나요?',
      answer: '로고 디자인은 보통 1-2주일, 웹사이트는 규모에 따라 3-8주 정도 소요됩니다.'
    },
    {
      id: 'f2',
      question: '수정 횟수 제한이 있나요?',
      answer: '기본적으로 메이저 수정 3회, 마이너 수정 무제한을 원칙으로 하여 고객 만족도를 높입니다.'
    }
  ]
};
