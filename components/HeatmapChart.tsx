import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { HeatmapDataPoint } from '../types';
import { COLORS } from '../constants';

interface HeatmapChartProps {
  data: HeatmapDataPoint[];
  isDetailView?: boolean;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, isDetailView }) => {
  const strokeColor = isDetailView ? COLORS.accentBlue : COLORS.accentRed;
  const fillColor = isDetailView ? COLORS.detailSub : '#E8D5C8'; // Slightly darker version of global sub

  return (
    <div className="w-full h-full p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={isDetailView ? "colorDensityBlue" : "colorDensityRed"} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDetailView ? '#ffffff80' : '#86261720'} />
          <XAxis 
            dataKey="time" 
            tick={{ fill: strokeColor, fontSize: 12, fontFamily: 'Noto Serif SC' }} 
            axisLine={{ stroke: strokeColor }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: strokeColor, fontSize: 12 }} 
            axisLine={{ stroke: strokeColor }}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDetailView ? COLORS.detailSub : COLORS.sub,
              borderColor: strokeColor,
              color: strokeColor,
              fontFamily: 'Noto Serif SC'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="density" 
            stroke={strokeColor} 
            fillOpacity={1} 
            fill={`url(#${isDetailView ? "colorDensityBlue" : "colorDensityRed"})`} 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke={strokeColor} 
            strokeDasharray="5 5" 
            strokeWidth={1} 
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeatmapChart;