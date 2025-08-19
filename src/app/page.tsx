'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { ArrowLeftIcon } from '@/assets/icons/arrowLeft';
import { Pilot } from '@/assets/pilot';
import { pilots } from './data';
import { FooterMenu } from '@/components/FooterMenu';
import { Header } from '@/components/Header';

export default function Home() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState<'left' | 'right' | null>(null);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const getWrappedIdx = (idx: number) => {
    if (idx < 0) return pilots.length - 1;
    if (idx >= pilots.length) return 0;
    return idx;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        triggerAnim(getWrappedIdx(current + 1), 'left');
      } else if (deltaX > 0) {
        triggerAnim(getWrappedIdx(current - 1), 'right');
      }
    }
    touchStartX.current = null;
  };

  const handleDotClick = (idx: number) => {
    if (idx === current) return;
    triggerAnim(
      idx,
      idx > current || (current === pilots.length - 1 && idx === 0) ? 'left' : 'right'
    );
  };

  const triggerAnim = (idx: number, direction: 'left' | 'right') => {
    setAnim(direction);
    setNextIdx(idx);
    setTimeout(() => {
      setCurrent(idx);
      setAnim(null);
      setNextIdx(null);
    }, 250);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header>
        <div className="flex pt-10">
          <button
            className="p-2 w-10 h-10 border-2 border-navy-900 rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-[2rem] leading-[2.5rem] font-bold pl-5 pt-1">
            Otwórz <br /> bramę
          </h1>
        </div>
      </Header>
      <div className="w-full">
        <div className="flex">
          <Pilot className="w-32 h-96 mb-16" />
          <div
            className="ml-6 flex-1 pr-4 mb-4 relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative">
              {/* Aktualny pilot */}
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-250
                    ${anim === 'left' ? '-translate-x-full opacity-0' : ''}
                    ${anim === 'right' ? 'translate-x-full opacity-0' : ''}
                    ${!anim ? 'translate-x-0 opacity-100' : ''}
                  `}
                style={{ zIndex: 1 }}
              >
                <h2 className="font-bold text-2xl pb-10 pt-4">{pilots[current].name}</h2>
                <div className={`space-y-3 ${pilots[current].gates.length > 4 ? 'pr-4' : ''}`}>
                  {pilots[current].gates.map((gate) => (
                    <button
                      key={gate}
                      className="w-full py-2 px-4 mb-4 rounded-lg border border-primary font-medium"
                    >
                      {gate}
                    </button>
                  ))}
                </div>
                <p className="text-center mt-2">Wybierz bramę, by otworzyć</p>
              </div>
              {/* Następny pilot */}
              {anim && nextIdx !== null && (
                <div
                  className={`absolute top-0 left-0 w-full transition-all duration-250
                      ${anim === 'left' ? 'translate-x-full opacity-0' : ''}
                      ${anim === 'right' ? '-translate-x-full opacity-0' : ''}
                    `}
                  style={{ zIndex: 2 }}
                >
                  <h2 className="font-bold text-2xl  pb-10 pt-4">{pilots[nextIdx].name}</h2>
                  <div className={`space-y-3 ${pilots[nextIdx].gates.length > 4 ? 'pr-2' : ''}`}>
                    {pilots[nextIdx].gates.map((gate) => (
                      <button
                        key={gate}
                        className="w-full py-2 px-4 mb-6 rounded-lg border border-primary font-medium"
                      >
                        {gate}
                      </button>
                    ))}
                  </div>
                  <p className="text-center mt-2">Wybierz bramę, by otworzyć</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 space-x-2 mb-20">
        {pilots.map((_, idx) => (
          <button
            key={idx}
            className={`w-[22px] h-[22px] rounded-full shadow-primary transition-colors ${
              current === idx ? 'bg-primary' : ''
            }`}
            aria-label={`Wybierz pilota ${idx + 1}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
      <FooterMenu />
    </div>
  );
}
