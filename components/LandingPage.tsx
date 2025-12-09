import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative w-full h-full bg-axis-bg bg-paper-texture overflow-hidden flex flex-col items-center justify-center text-axis-accentRed">
      
      {/* --- Decorative Background Elements --- */}
      
      {/* Corner Borders */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-axis-accentRed opacity-50"></div>
      <div className="absolute top-8 right-8 w-24 h-24 border-t-4 border-r-4 border-axis-accentRed opacity-50"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-4 border-l-4 border-axis-accentRed opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-axis-accentRed opacity-50"></div>

      {/* Traditional Cloud/Water Patterns (SVG) */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-20 pointer-events-none">
         <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-current text-axis-accentRed">
            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </div>

      {/* Large Watermark Character */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[400px] font-calligraphy opacity-5 select-none pointer-events-none whitespace-nowrap">
        中轴
      </div>

      {/* --- Main Content --- */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Vertical Title Group */}
        <div className="flex flex-row-reverse gap-8 mb-16 items-start">
            {/* Title Column 1 */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-axis-accentRed text-axis-sub rounded flex items-center justify-center text-5xl font-calligraphy shadow-lg border-2 border-double border-axis-sub">
                    智
                </div>
                <div className="w-20 h-20 bg-axis-accentRed text-axis-sub rounded flex items-center justify-center text-5xl font-calligraphy shadow-lg border-2 border-double border-axis-sub">
                    调
                </div>
            </div>
             {/* Title Column 2 */}
            <div className="flex flex-col items-center gap-4 mt-12">
                <div className="w-20 h-20 bg-axis-accentRed text-axis-sub rounded flex items-center justify-center text-5xl font-calligraphy shadow-lg border-2 border-double border-axis-sub">
                    中
                </div>
                <div className="w-20 h-20 bg-axis-accentRed text-axis-sub rounded flex items-center justify-center text-5xl font-calligraphy shadow-lg border-2 border-double border-axis-sub">
                    轴
                </div>
            </div>
            
            {/* Red Seal Decoration */}
            <div className="self-end mb-4 ml-4 opacity-80">
                <div className="w-12 h-12 border-2 border-axis-accentRed rounded-sm p-1">
                    <div className="w-full h-full border border-axis-accentRed flex items-center justify-center text-[10px] font-bold text-axis-accentRed writing-vertical-rl leading-none">
                        文旅<br/>智慧
                    </div>
                </div>
            </div>
        </div>

        {/* Slogan */}
        <div className="mb-12 text-center space-y-2">
            <div className="h-px w-32 bg-axis-accentRed mx-auto mb-4 opacity-50"></div>
            <h2 className="text-2xl md:text-3xl font-serif-sc tracking-[0.2em] text-axis-accentBlue font-bold">
                智慧调度文旅 · 传播中轴魅力
            </h2>
            <p className="text-sm md:text-base font-serif-sc tracking-widest opacity-70 uppercase mt-2">
                Smart Dispatch for Beijing Central Axis
            </p>
             <div className="h-px w-32 bg-axis-accentRed mx-auto mt-4 opacity-50"></div>
        </div>

        {/* Enter Button */}
        <button 
            onClick={onEnter}
            className="group relative px-12 py-4 bg-transparent border-2 border-axis-accentRed text-axis-accentRed font-bold font-serif-sc text-lg tracking-widest overflow-hidden transition-all hover:text-axis-sub hover:border-transparent hover:shadow-xl"
        >
            <div className="absolute inset-0 w-0 bg-axis-accentRed transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
            <span className="relative z-10 flex items-center gap-2">
                开启旅程 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
        </button>

      </div>
    </div>
  );
};

export default LandingPage;