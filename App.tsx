import React, { useState, useMemo } from 'react';
import { Search, Info, Map as MapIcon, ChevronRight, Compass, Route as RouteIcon, Clock, User, Layers, ArrowLeft } from 'lucide-react';
import { LOCATIONS, MOCK_HEATMAP_DATA, COLORS } from './constants';
import { Spot, TransportMode, SidebarTab } from './types';
import MapCanvas from './components/MapCanvas';
import HeatmapChart from './components/HeatmapChart';
import DetailView from './components/DetailView';
import { RoutePanel, HeatmapPanel, TimePanel, UserPanel } from './components/SidebarPanels';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false); // State to track if user has passed the landing page
  const [currentView, setCurrentView] = useState<'global' | 'detail'>('global');
  const [activeTab, setActiveTab] = useState<SidebarTab>('explore');
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [transportMode, setTransportMode] = useState<TransportMode>('walking');
  const [showHeatmapLayer, setShowHeatmapLayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSpot = useMemo(() => 
    LOCATIONS.find(s => s.id === selectedSpotId), 
  [selectedSpotId]);

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return [];
    return LOCATIONS.filter(l => l.name.includes(searchQuery));
  }, [searchQuery]);

  const handleSpotClick = (spot: Spot) => {
    setSelectedSpotId(spot.id);
    setCurrentView('detail');
  };

  const handleNavClick = (tab: SidebarTab) => {
      setActiveTab(tab);
      if (currentView === 'detail') setCurrentView('global');
  };

  // --- RENDER LANDING PAGE IF NOT ENTERED ---
  if (!hasEntered) {
      return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  // --- RENDER MAIN APP ---

  const renderSidebarContent = () => {
      switch (activeTab) {
          case 'routes':
              return <RoutePanel onSelectRoute={(mode) => setTransportMode(mode)} />;
          case 'heatmap':
              return <HeatmapPanel heatmapData={MOCK_HEATMAP_DATA} isLayerVisible={showHeatmapLayer} onToggleLayer={setShowHeatmapLayer} />;
          case 'time':
              return <TimePanel />;
          case 'user':
              return <UserPanel />;
          case 'explore':
          default:
              return (
                <>
                    {/* Search */}
                    <div className="p-4 relative z-20">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="搜索景点 (如: 故宫)" 
                                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-axis-accentRed/30 rounded focus:outline-none focus:border-axis-accentRed placeholder-axis-accentRed/50 transition-all font-serif-sc"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-axis-accentRed/50" size={18} />
                            
                            {/* Search Results Dropdown */}
                            {searchQuery && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-axis-accentRed/20 rounded shadow-lg max-h-60 overflow-y-auto z-50">
                                    {filteredLocations.length > 0 ? (
                                        filteredLocations.map(spot => (
                                            <div 
                                                key={spot.id}
                                                className="p-3 hover:bg-axis-sub cursor-pointer border-b border-dashed border-axis-accentRed/10 last:border-0"
                                                onClick={() => {
                                                    handleSpotClick(spot);
                                                    setSearchQuery('');
                                                }}
                                            >
                                                <div className="font-bold text-axis-accentRed">{spot.name}</div>
                                                <div className="text-xs text-gray-500 truncate">{spot.description}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-gray-500 text-center">未找到相关景点</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="px-4 mb-4">
                        <div className="bg-white/40 p-4 rounded-lg border border-axis-accentRed/20 flex flex-col h-48">
                            <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
                                <Layers size={16} /> 区域概览
                            </h3>
                            <div className="flex-1 -ml-2">
                                <HeatmapChart data={MOCK_HEATMAP_DATA} />
                            </div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
                         <div className="bg-white/40 p-2 rounded-lg border border-axis-accentRed/20">
                            {LOCATIONS.map(loc => (
                                <div 
                                    key={loc.id} 
                                    onClick={() => handleSpotClick(loc)}
                                    className="flex justify-between items-center p-3 rounded hover:bg-axis-accentRed/10 cursor-pointer group border-b border-dashed border-axis-accentRed/10 last:border-0 transition-colors"
                                >
                                    <div>
                                        <span className="text-sm font-medium block">{loc.name}</span>
                                        <span className="text-[10px] opacity-60">{loc.description.substring(0, 15)}...</span>
                                    </div>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
              );
      }
  };

  return (
    <div className="h-screen w-screen flex bg-axis-bg font-serif-sc text-axis-accentRed overflow-hidden animate-fade-in">
      
      {/* 1. Slim Vertical Navigation Rail */}
      <div className="w-16 h-full bg-axis-accentRed text-white flex flex-col items-center py-6 shadow-2xl z-50">
          <div className="mb-8 font-calligraphy text-2xl border-2 border-white/30 rounded-full w-10 h-10 flex items-center justify-center">京</div>
          
          <div className="flex-1 space-y-6 w-full">
              {[
                  { id: 'explore', icon: Compass, label: '探索' },
                  { id: 'routes', icon: RouteIcon, label: '路线' },
                  { id: 'heatmap', icon: Layers, label: '热力' },
                  { id: 'time', icon: Clock, label: '时间' },
                  { id: 'user', icon: User, label: '我的' },
              ].map(item => {
                  const isActive = activeTab === item.id;
                  return (
                    <button 
                        key={item.id}
                        onClick={() => handleNavClick(item.id as SidebarTab)}
                        className={`w-full flex flex-col items-center gap-1 py-2 transition-all relative ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px]">{item.label}</span>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></div>}
                    </button>
                  )
              })}
          </div>
      </div>

      {/* 2. Expanded Sidebar Content Panel */}
      <div className="w-96 h-full bg-axis-sub border-r-4 border-double border-axis-accentRed/20 z-40 shadow-xl flex flex-col relative transition-all duration-300">
        {/* Title Area */}
        <div className="p-5 text-center border-b border-axis-accentRed/10 bg-paper-texture shrink-0">
            <h1 className="text-2xl font-calligraphy font-bold text-axis-accentRed">北京中轴线</h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-axis-accentRed/60">Smart Guide</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-paper-texture">
             {currentView === 'global' ? (
                 <div className="h-full flex flex-col animate-fade-in">
                     {renderSidebarContent()}
                 </div>
             ) : (
                 <div className="h-full flex flex-col p-4">
                     <button 
                        onClick={() => setCurrentView('global')}
                        className="mb-4 flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100"
                     >
                         <ArrowLeft size={16}/> 返回列表
                     </button>
                     <div className="flex-1 flex items-center justify-center text-center opacity-50 p-6 border border-dashed border-axis-accentRed/20 rounded">
                         <p className="text-sm">正在查看详情页<br/>(详情内容覆盖全屏)</p>
                     </div>
                 </div>
             )}
        </div>
      </div>

      {/* 3. Main Map Area */}
      <div className="flex-1 relative h-full">
        {currentView === 'detail' && selectedSpot ? (
             <div className="absolute inset-0 z-30">
                 <DetailView spot={selectedSpot} onBack={() => setCurrentView('global')} />
             </div>
        ) : (
             <div className="w-full h-full relative">
                <MapCanvas 
                    locations={LOCATIONS} 
                    selectedSpotId={selectedSpotId} 
                    onSpotClick={handleSpotClick}
                    transportMode={transportMode}
                    showHeatmapLayer={showHeatmapLayer}
                />
                {!selectedSpotId && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-lg border border-axis-accentRed/30 backdrop-blur pointer-events-none">
                        <span className="text-sm text-axis-accentRed font-bold flex items-center gap-2">
                            <Info size={16} /> 
                            {showHeatmapLayer ? '热力图层已开启' : '点击地图节点查看详情'}
                        </span>
                    </div>
                )}
             </div>
        )}
      </div>

    </div>
  );
};

export default App;