'use client';

import { useState } from 'react';
import { Copy, Calculator, Clock, Book, AlertCircle } from 'lucide-react';

export default function Home() {
  const [totalInput, setTotalInput] = useState('');
  const [supplyInput, setSupplyInput] = useState('');
  const [salesInput, setSalesInput] = useState('');
  const [purchaseInput, setPurchaseInput] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const total = Number(totalInput) || 0;
  const supplyFromTotal = Math.floor(total / 1.1);
  const vatFromTotal = total - supplyFromTotal;

  const supply = Number(supplyInput) || 0;
  const vatFromSupply = Math.floor(supply * 0.1);
  const totalFromSupply = supply + vatFromSupply;

  const sales = Number(salesInput) || 0;
  const purchase = Number(purchaseInput) || 0;
  const payableVat = Math.max(0, Math.floor(sales * 0.1) - Math.floor(purchase * 0.1));

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} 복사 완료`);
  };

  const addToHistory = () => {
    if (total || supply) {
      const entry = {
        date: new Date().toLocaleString('ko-KR'),
        supply: supplyFromTotal || supply,
        vat: vatFromTotal || vatFromSupply,
        total: total || totalFromSupply,
      };
      setHistory([entry, ...history.slice(0, 9)]);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const snsItems = [
    { name: '카카오톡', icon: '💬', url: `https://ka.kakao.com/talk/share?text=부가세 계산기 바로가기!&url=${encodeURIComponent(currentUrl)}` },
    { name: '인스타그램', icon: '📸', url: `https://www.instagram.com/` },
    { name: '페이스북', icon: 'f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { name: 'X', icon: '𝕏', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=부가가치세 계산기` },
    { name: '카카오스토리', icon: '📖', url: `https://story.kakao.com/share?url=${encodeURIComponent(currentUrl)}` },
    { name: '밴드', icon: '🎵', url: `https://band.us/plugin/share?body=${encodeURIComponent(currentUrl)}` },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 왼쪽 사이드바 */}
      <aside className="w-72 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">TaxCal</h1>
          </div>

          <nav className="space-y-1">
            <a href="#calc" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 font-medium">🧮 계산기</a>
            <a href="#knowledge" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 font-medium">📖 부가세 지식</a>
            <a href="#report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 font-medium">📅 신고·세율</a>
            <a href="#faq" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 font-medium">❓ FAQ / 사용법</a>
          </nav>

          <div className="mt-12 text-xs text-gray-500 leading-relaxed">
            2026년 한국 세법 기준<br />
            일반과세자 10% 적용
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="ml-72 flex-1 p-8 lg:p-12 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">부가가치세 계산기</h1>
          <p className="text-xl text-gray-600">합계금액이나 공급가액만 입력 → 0.1초 만에 부가세·납부세액까지!</p>
        </header>

        {/* 계산기 섹션 */}
        <section id="calc" className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-16">
          <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
            <Calculator className="w-7 h-7" /> 실시간 부가세 계산
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            {/* 합계금액 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">합계금액 (부가세 포함)</label>
              <input
                type="number"
                value={totalInput}
                onChange={e => setTotalInput(e.target.value)}
                className="w-full text-4xl font-bold border-2 border-blue-100 rounded-xl px-6 py-5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="110,000"
              />
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>공급가액</span>
                  <span className="font-bold">{supplyFromTotal.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>부가세 (10%)</span>
                  <span className="font-bold text-blue-600">{vatFromTotal.toLocaleString()} 원</span>
                </div>
                <button
                  onClick={() => {
                    copyToClipboard(supplyFromTotal.toLocaleString(), '공급가액');
                    copyToClipboard(vatFromTotal.toLocaleString(), '부가세');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  <Copy size={18} /> 결과 모두 복사
                </button>
              </div>
            </div>

            {/* 공급가액 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">공급가액 (부가세 제외)</label>
              <input
                type="number"
                value={supplyInput}
                onChange={e => setSupplyInput(e.target.value)}
                className="w-full text-4xl font-bold border-2 border-blue-100 rounded-xl px-6 py-5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="100,000"
              />
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>합계금액</span>
                  <span className="font-bold">{totalFromSupply.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>부가세 (10%)</span>
                  <span className="font-bold text-blue-600">{vatFromSupply.toLocaleString()} 원</span>
                </div>
                <button
                  onClick={() => {
                    copyToClipboard(totalFromSupply.toLocaleString(), '합계금액');
                    copyToClipboard(vatFromSupply.toLocaleString(), '부가세');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  <Copy size={18} /> 결과 모두 복사
                </button>
              </div>
            </div>
          </div>

          {/* 납부세액 */}
          <div className="border-t pt-10">
            <h3 className="text-2xl font-semibold mb-6">매출·매입 납부세액 미리보기</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-2">매출액</label>
                <input
                  type="number"
                  value={salesInput}
                  onChange={e => setSalesInput(e.target.value)}
                  className="w-full text-3xl font-bold border rounded-xl px-5 py-4"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">매입액</label>
                <input
                  type="number"
                  value={purchaseInput}
                  onChange={e => setPurchaseInput(e.target.value)}
                  className="w-full text-3xl font-bold border rounded-xl px-5 py-4"
                  placeholder="0"
                />
              </div>
              <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center">
                <div className="text-sm text-gray-600 mb-1">예상 납부세액</div>
                <div className="text-4xl font-bold text-red-600">{payableVat.toLocaleString()} 원</div>
                <button
                  onClick={() => copyToClipboard(payableVat.toLocaleString(), '납부세액')}
                  className="mt-4 text-blue-600 flex items-center gap-2 text-sm"
                >
                  <Copy size={16} /> 복사
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={addToHistory}
            className="mt-10 w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            이 계산 기록에 저장하기
          </button>
        </section>

        {/* 최근 기록 */}
        {history.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Clock /> 최근 계산 기록
            </h2>
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="bg-white border rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <div className="font-medium">
                      공급가 {item.supply.toLocaleString()} 원 · 부가세 {item.vat.toLocaleString()} 원
                    </div>
                  </div>
                  <button onClick={() => copyToClipboard(`${item.supply} / ${item.vat}`, '기록')} className="text-blue-600">
                    <Copy size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 부가세 지식 */}
        <section id="knowledge" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
            <Book /> 부가가치세 기본
          </h2>
          <div className="prose text-gray-700 leading-relaxed max-w-none">
            <p>부가가치세(VAT)는 재화·용역의 부가가치에 과세되는 간접세입니다.</p>
            <p>사업자는 <strong>매출 시 고객에게 받은 부가세</strong> - <strong>매입 시 공급자에게 지급한 부가세</strong> = 납부세액</p>
            <p>2026년 기준 일반과세자 세율은 <strong>10%</strong>이며, 간이과세자는 업종별 낮은 세율 적용 가능.</p>
          </div>
        </section>

        {/* 신고 기한 */}
        <section id="report" className="bg-white rounded-2xl p-8 md:p-10 mb-16 border">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
            <AlertCircle /> 2026년 신고·납부 기한
          </h2>
          <ul className="space-y-3 text-lg">
            <li>• 1기 확정신고 (1~6월분) : 7월 25일까지</li>
            <li>• 2기 확정신고 (7~12월분) : 다음해 1월 25일까지</li>
            <li>• 예정신고 : 4월·10월 중 (해당 시기)</li>
            <li className="text-red-600 font-medium">지연 시 가산세 3% + 일 0.025% 부과됨</li>
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">자주 묻는 질문</h2>
          <div className="space-y-8">
            <div>
              <strong className="block text-lg mb-2">Q. 왜 합계 ÷ 1.1 로 계산하나요?</strong>
              <p>부가세 10%가 포함된 금액이므로, 1.1로 나누면 공급가액이 나옵니다. (원 단위 절사)</p>
            </div>
            <div>
              <strong className="block text-lg mb-2">Q. 계산 결과를 어디에 쓰나요?</strong>
              <p>세금계산서 발행, 견적서 작성, 홈택스 신고 준비 시 복사해서 바로 사용 가능합니다.</p>
            </div>
            <div>
              <strong className="block text-lg mb-2">Q. 납부세액이 마이너스면 어떻게 되나요?</strong>
              <p>환급 대상입니다. 홈택스에서 환급 신청 가능 (조건 충족 시)</p>
            </div>
          </div>
        </section>

        {/* SNS 공유 */}
        <div className="flex flex-wrap gap-6 justify-center mt-12 mb-20">
          {snsItems.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 hover:scale-110 transition"
            >
              <div className="text-4xl">{item.icon}</div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </a>
          ))}
        </div>

        <footer className="text-center text-gray-500 text-sm mt-16">
          © 2026 TaxCal • Vercel + Next.js
        </footer>
      </main>
    </div>
  );
}