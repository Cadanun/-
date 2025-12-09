import React from 'react';
import { MOCK_HEATMAP_DATA } from '../constants'; // Using mock data for simplicity
import { Spot } from '../types';
import { ArrowLeft, MapPin, Clock, Users, Navigation } from 'lucide-react';
import HeatmapChart from './HeatmapChart';

interface DetailViewProps {
  spot: Spot;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ spot, onBack }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-axis-detailBg text-axis-accentBlue font-serif-sc animate-fade-in relative bg-paper-texture">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-axis-detailBg/95 backdrop-blur-sm border-b border-axis-accentBlue/20 shadow-sm p-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-axis-detailSub transition-colors text-axis-accentBlue border border-axis-accentBlue/30"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold font-calligraphy tracking-widest">{spot.name}</h1>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Info & Stats */}
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-axis-detailSub/80 p-6 rounded-lg border border-axis-accentBlue/30 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-axis-accentBlue/20 pb-2">
              <MapPin size={20} />
              景点概况
            </h2>
            <p className="leading-loose text-lg opacity-90">
              {spot.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
               <div className="px-4 py-2 bg-axis-detailBg rounded border border-axis-accentBlue/20 flex items-center gap-2">
                  <Clock size={16} />
                  <span>建议游玩: 1.5 - 2 小时</span>
               </div>
               <div className="px-4 py-2 bg-axis-detailBg rounded border border-axis-accentBlue/20 flex items-center gap-2">
                  <Users size={16} />
                  <span>当前舒适度: {spot.crowdLevel === 'low' ? '舒适' : spot.crowdLevel === 'moderate' ? '适中' : '拥挤'}</span>
               </div>
            </div>
          </div>

          {/* Crowd Heatmap */}
          <div className="bg-axis-detailSub/80 p-6 rounded-lg border border-axis-accentBlue/30 shadow-lg backdrop-blur-sm min-h-[300px]">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between border-b border-axis-accentBlue/20 pb-2">
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>实时人流趋势</span>
              </div>
              <span className="text-xs font-normal border border-axis-accentBlue rounded px-2 py-0.5">实时更新</span>
            </h2>
            <div className="h-64">
              <HeatmapChart data={MOCK_HEATMAP_DATA} isDetailView={true} />
            </div>
          </div>
        </div>

        {/* Right Column: Internal Map & Entry Guide */}
        <div className="space-y-6">
           {/* Entry Recommendations */}
           <div className="bg-axis-detailSub/80 p-6 rounded-lg border border-axis-accentBlue/30 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-axis-accentBlue/20 pb-2">
              <Clock size={20} />
              分时段入园建议
            </h2>
            <div className="grid grid-cols-2 gap-4">
               {['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00'].map((time, idx) => (
                  <div key={idx} className={`p-3 rounded border flex justify-between items-center ${idx === 0 ? 'bg-axis-accentBlue text-white border-axis-accentBlue' : 'bg-axis-detailBg border-axis-accentBlue/20'}`}>
                    <span className="font-mono font-bold">{time}</span>
                    <span className="text-sm">{idx === 0 ? '推荐' : '较挤'}</span>
                  </div>
               ))}
            </div>
          </div>

          {/* Internal Map Placeholder */}
          <div className="bg-axis-detailSub/80 p-6 rounded-lg border border-axis-accentBlue/30 shadow-lg backdrop-blur-sm flex-1">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-axis-accentBlue/20 pb-2">
              <Navigation size={20} />
              内部游览路线
            </h2>
            <div className="aspect-square w-full bg-axis-detailBg rounded border border-axis-accentBlue/20 relative overflow-hidden flex items-center justify-center group cursor-pointer">
              {/* Abstract representation of internal map */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/800/800?grayscale')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                 <div className="w-16 h-16 border-2 border-axis-accentBlue rounded-full flex items-center justify-center mx-auto mb-2 bg-axis-detailSub shadow-lg">
                    <span className="font-calligraphy text-2xl text-axis-accentBlue">图</span>
                 </div>
                 <p className="text-sm font-bold">点击查看高清导览图</p>
              </div>
              
              {/* Simulated internal route points */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-axis-accentBlue rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-axis-accentBlue rounded-full animate-ping delay-150"></div>
            </div>
            <div className="mt-4 text-sm leading-relaxed opacity-80">
              推荐路线：南门入口 &rarr; 主殿 &rarr; 西配殿 &rarr; 后花园 &rarr; 北门出口。全程无台阶，适合所有人群。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;