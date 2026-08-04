import React, { useState, useEffect } from 'react';
import SmoothScroller from '../components/Layout/SmoothScroller';
import LoaderV2 from '../components/V2/LoaderV2';
import Background3D from '../components/V2/Background3D';
import HeroV2 from '../components/V2/HeroV2';
import Section2V2 from '../components/V2/Section2V2';
import StatementV2 from '../components/V2/StatementV2';
import Section4V2 from '../components/V2/Section4V2';
import JourneyV2 from '../components/V2/JourneyV2';
import Section3V2 from '../components/V2/Section3V2';
import BreakBarriersV2 from '../components/V2/BreakBarriersV2';
import Section5V2 from '../components/V2/Section5V2';
import TestimonialsV2 from '../components/V2/TestimonialsV2';
import Section6V2 from '../components/V2/Section6V2';
import FixedOverlayV2 from '../components/V2/FixedOverlayV2';

export default function HomeV2() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        user_agent: navigator.userAgent
      })
    }).catch(console.error);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroller>
      <div className="bg-[#050505] min-h-screen text-[#F5F2EC] selection:bg-[#ff4f00] selection:text-white relative">
        <LoaderV2 isLoading={loading} />
        
        {/* Background 3D Model with HEFESTO_FABRICA.glb */}
        <Background3D />

        {/* Fixed Overlay Controls */}
        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'} relative z-40`}>
          <FixedOverlayV2 />
        </div>
          
        <main className="flex flex-col relative z-10">
          <HeroV2 />
          <Section2V2 />
          <StatementV2 />
          <Section4V2 />
          <JourneyV2 />
          <Section3V2 />
          <BreakBarriersV2 />
          <Section5V2 />
          <TestimonialsV2 />
          <Section6V2 />
        </main>
      </div>
    </SmoothScroller>
  );
}


