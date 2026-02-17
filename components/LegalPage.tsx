
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const content = type === 'terms' ? {
    title: '이용약관',
    date: '시행일: 2024년 1월 1일',
    body: `
      제1조 (목적)
      본 약관은 JoyWeb(이하 "회사")이 제공하는 디자인 및 웹사이트 제작 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.

      제2조 (서비스의 제공)
      1. 회사는 로고 디자인, 웹사이트 제작, UI/UX 컨설팅 등의 서비스를 제공합니다.
      2. 서비스의 구체적인 범위와 비용은 개별 계약서에 따릅니다.

      제3조 (저작권의 귀속)
      1. 최종 결과물의 저작권은 잔금 결제 완료 후 고객에게 귀속됩니다.
      2. 회사는 포트폴리오 목적으로 결과물을 자사 사이트에 게시할 권리를 가집니다.
    `
  } : {
    title: '개인정보처리방침',
    date: '최종 수정일: 2024년 1월 1일',
    body: `
      JoyWeb은 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.

      1. 수집하는 개인정보 항목: 성함, 연락처, 업체명, 이메일 주소.
      2. 수집 목적: 견적 문의 응대 및 프로젝트 진행을 위한 원활한 의사소통.
      3. 보유 및 이용기간: 목적 달성 후 즉시 파기하거나, 관련 법령에 따라 최대 3년간 보관합니다.
      4. 거부권: 개인정보 수집에 거부할 권리가 있으나, 거부 시 견적 상담이 제한될 수 있습니다.
    `
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-32 animate-in fade-in slide-in-from-bottom-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-teal-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={20} /> 홈으로 돌아가기
      </button>
      <h1 className="text-4xl font-black text-slate-900 mb-2">{content.title}</h1>
      <p className="text-slate-400 mb-12">{content.date}</p>
      <div className="prose prose-slate max-w-none">
        {content.body.split('\n').map((line, i) => (
          <p key={i} className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap">
            {line.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};
