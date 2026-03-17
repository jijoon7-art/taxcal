import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '부가가치세 계산기 | VAT 즉시 계산 - 공급가액·부가세·납부세액',
  description: '합계금액 또는 공급가액 입력 → 부가세 자동 계산. 복사 버튼, 매출·매입 납부세액 계산기, FAQ까지 모두 한 페이지에!',
  keywords: '부가가치세 계산기, 부가세 계산, VAT 계산기, 세금계산서, 공급가액 계산, 부가세 신고',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}