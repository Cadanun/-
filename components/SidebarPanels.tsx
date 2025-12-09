import React, { useState } from 'react';
import { GeneratedRoute, Spot, UserProfile, TransportMode } from '../types';
import { LOCATIONS, COLORS } from '../constants';
import { Clock, MapPin, Footprints, Bus, User, Settings, Hash, Plus, X, Search, Navigation } from 'lucide-react';
import HeatmapChart from './HeatmapChart';

// --- PANEL: Recommended Routes ---
export const RoutePanel: React.FC<{ 
    onSelectRoute: (mode: TransportMode) => void 
}> = ({ onSelectRoute }) => {
    const [generating, setGenerating] = useState(false);
    
    // Mock Routes
    const routes: GeneratedRoute[] = [
        { id: 1, name: "经典中轴全览", duration: "3.5小时", mode: "transit", tags: ["高效", "地标"], stops: [1, 2, 4, 6, 9, 12, 16] },
        { id: 2, name: "古都步行漫游", duration: "6小时", mode: "walking", tags: ["深度", "摄影"], stops: [1, 3, 4, 8, 10, 13, 19] },
        { id: 3, name: "避开人流特选", duration: "4小时", mode: "transit", tags: ["舒适", "小众"], stops: [1, 14, 15, 17, 18] },
    ];

    return (
        <div className="space-y-4 p-1">
            <h2 className="text-xl font-bold font-calligraphy flex items-center gap-2 text-axis-accentRed">
                <Navigation size={24} /> 智能路线推荐
            </h2>
            <div className="text-sm opacity-80 mb-4">
                依据实时人流、您的位置及兴趣标签为您定制。
            </div>

            {/* Controls */}
            <div className="bg-white/50 p-3 rounded border border-axis-accentRed/20 space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span>偏好交通</span>
                    <div className="flex gap-1">
                         <span className="px-2 py-0.5 bg-axis-accentRed text-white rounded text-xs">不限</span>
                         <span className="px-2 py-0.5 bg-white border border-axis-accentRed/20 rounded text-xs">步行</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>人流容忍度</span>
                    <span className="text-xs text-green-700 font-bold">优先舒适</span>
                </div>
            </div>

            {/* Results */}
            <div className="space-y-3 mt-4">
                {routes.map(route => (
                    <div 
                        key={route.id} 
                        onClick={() => onSelectRoute(route.mode)}
                        className="p-4 bg-white/80 rounded-lg border border-axis-accentRed/20 hover:border-axis-accentRed cursor-pointer transition-all shadow-sm hover:shadow-md group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-axis-accentRed group-hover:text-axis-accentBlue transition-colors">{route.name}</h3>
                            <span className="text-xs font-mono bg-axis-sub px-1 rounded border border-axis-accentRed/10">
                                {route.mode === 'walking' ? '步行' : '公交+步行'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1"><Clock size={12}/> {route.duration}</span>
                            <span className="flex items-center gap-1"><MapPin size={12}/> {route.stops.length}个景点</span>
                        </div>
                        <div className="flex gap-2">
                            {route.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 bg-axis-accentBlue/10 text-axis-accentBlue rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PANEL: Heatmap Control ---
export const HeatmapPanel: React.FC<{
    heatmapData: any;
    onToggleLayer: (show: boolean) => void;
    isLayerVisible: boolean;
}> = ({ heatmapData, onToggleLayer, isLayerVisible }) => {
    return (
        <div className="space-y-4 p-1">
            <h2 className="text-xl font-bold font-calligraphy flex items-center gap-2 text-axis-accentRed">
                <MapPin size={24} /> 实时热力监测
            </h2>
            
            <div className="bg-white/50 p-4 rounded-lg border border-axis-accentRed/20">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm">地图热力叠加层</span>
                    <button 
                        onClick={() => onToggleLayer(!isLayerVisible)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${isLayerVisible ? 'bg-axis-accentBlue' : 'bg-gray-300'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isLayerVisible ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
                <p className="text-xs opacity-70 mb-4">开启后将在右侧地图直接显示各景点拥挤程度。</p>
            </div>

            <div className="h-64 bg-white/50 p-2 rounded-lg border border-axis-accentRed/20">
                <div className="text-xs text-center mb-2 font-bold opacity-80">全区人流趋势 (24h)</div>
                <HeatmapChart data={heatmapData} />
            </div>

            <div className="bg-white/50 p-4 rounded-lg border border-axis-accentRed/20">
                 <h3 className="text-sm font-bold mb-2">区域预警</h3>
                 <div className="space-y-2">
                     <div className="flex justify-between items-center text-xs">
                         <span>天安门广场</span>
                         <span className="text-red-600 font-bold">极度拥挤</span>
                     </div>
                     <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-red-600 h-full w-[95%]"></div>
                     </div>
                     
                     <div className="flex justify-between items-center text-xs mt-2">
                         <span>故宫博物院</span>
                         <span className="text-orange-600 font-bold">拥挤</span>
                     </div>
                     <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-orange-500 h-full w-[80%]"></div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

// --- PANEL: Recommended Entry Time ---
export const TimePanel: React.FC = () => {
    // Sort locations by optimal time availability (Mock logic)
    const optimalSpots = LOCATIONS.filter(l => l.crowdLevel === 'low');
    const warningSpots = LOCATIONS.filter(l => l.crowdLevel === 'high');

    return (
        <div className="space-y-4 p-1 h-full flex flex-col">
            <h2 className="text-xl font-bold font-calligraphy flex items-center gap-2 text-axis-accentRed">
                <Clock size={24} /> 错峰出行建议
            </h2>
            <p className="text-sm opacity-80">基于历史数据与实时人流，为您推荐当前最佳入园景点。</p>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {/* Best Time Now */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded inline-block">当前推荐进入 (舒适)</h3>
                    {optimalSpots.map(spot => (
                        <div key={spot.id} className="bg-white/60 p-3 rounded border border-green-200 flex justify-between items-center">
                            <div>
                                <div className="font-bold text-axis-accentRed">{spot.name}</div>
                                <div className="text-xs text-gray-500">建议停留: 1h</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-mono font-bold text-green-600">Now</div>
                                <div className="text-[10px] text-gray-400">人流 &lt; 20%</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Warning */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-red-700 bg-red-50 px-2 py-1 rounded inline-block">需预约/建议避开</h3>
                    {warningSpots.map(spot => (
                        <div key={spot.id} className="bg-white/40 p-3 rounded border border-red-100 flex justify-between items-center opacity-80">
                             <div>
                                <div className="font-bold text-gray-700">{spot.name}</div>
                                <div className="text-xs text-red-400">当前极度拥挤</div>
                            </div>
                             <div className="text-right">
                                <div className="text-xs font-bold text-axis-accentBlue">建议 16:00+</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- PANEL: User Center ---
export const UserPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'account' | 'custom'>('custom');
    const [tags, setTags] = useState<string[]>(['古建筑', '摄影', '清史']);
    const [newTag, setNewTag] = useState('');
    const [searchTag, setSearchTag] = useState('');

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const removeTag = (t: string) => {
        setTags(tags.filter(tag => tag !== t));
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold font-calligraphy flex items-center gap-2 text-axis-accentRed mb-4">
                <User size={24} /> 用户中心
            </h2>

            {/* Sub-tabs */}
            <div className="flex text-xs bg-axis-accentRed/10 rounded-lg p-1 mb-4">
                {['我的', '设置', '账户', '个性化'].map((tab, idx) => {
                    const key = ['profile', 'settings', 'account', 'custom'][idx] as any;
                    return (
                        <button 
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 py-1.5 rounded transition-all ${activeTab === key ? 'bg-white shadow text-axis-accentRed font-bold' : 'text-gray-600 hover:bg-white/50'}`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
                {activeTab === 'custom' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Tag Search */}
                        <div className="relative">
                             <input 
                                type="text"
                                placeholder="搜索兴趣标签..."
                                value={searchTag}
                                onChange={e => setSearchTag(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 bg-white/50 border border-axis-accentRed/20 rounded text-sm focus:outline-none focus:border-axis-accentBlue"
                             />
                             <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400"/>
                        </div>

                        {/* My Tags */}
                        <div className="bg-white/40 p-4 rounded-lg border border-axis-accentRed/10">
                            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                                <Hash size={14}/> 我的关注标签
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-axis-detailBg text-axis-accentBlue rounded-full text-xs shadow-sm group">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={10}/></button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newTag} 
                                    onChange={e => setNewTag(e.target.value)}
                                    placeholder="添加新标签..."
                                    className="flex-1 px-3 py-1 text-xs bg-white border border-axis-accentRed/20 rounded focus:outline-none"
                                    onKeyDown={e => e.key === 'Enter' && addTag()}
                                />
                                <button onClick={addTag} className="p-1 bg-axis-accentRed text-white rounded hover:bg-red-800">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Recommendations based on tags */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold opacity-80">猜你喜欢</h3>
                            <div className="p-3 bg-white/60 rounded border border-axis-accentRed/10 cursor-pointer hover:shadow-md transition-shadow">
                                <div className="font-bold text-axis-accentRed text-sm">史诗建筑摄影之旅</div>
                                <p className="text-xs text-gray-500 mt-1">根据标签“摄影”“古建筑”推荐</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'profile' && (
                    <div className="text-center py-10 opacity-60 text-sm">
                        <div className="w-16 h-16 bg-axis-accentRed/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <User size={30} className="text-axis-accentRed"/>
                        </div>
                        <p>游客 0921</p>
                        <p className="text-xs mt-1">Level 2 探险家</p>
                    </div>
                )}
                {(activeTab === 'settings' || activeTab === 'account') && (
                    <div className="text-center py-10 opacity-60 text-sm">
                        暂无内容
                    </div>
                )}
            </div>
        </div>
    );
};