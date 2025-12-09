import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Spot, TransportMode } from '../types';
import { COLORS } from '../constants';

interface MapCanvasProps {
  locations: Spot[];
  selectedSpotId: number | null;
  onSpotClick: (spot: Spot) => void;
  transportMode: TransportMode;
  showHeatmapLayer: boolean;
}

const MapCanvas: React.FC<MapCanvasProps> = ({ locations, selectedSpotId, onSpotClick, transportMode, showHeatmapLayer }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || locations.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Clear previous renders
    svg.selectAll("*").remove();

    // Group for zoomable content
    const g = svg.append("g");

    // Define Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial positioning
    const initialScale = Math.min(width / 800, height / 1200);
    const initialTx = (width - 500 * initialScale) / 2;
    const initialTy = 50; 

    svg.call(zoom.transform, d3.zoomIdentity.translate(initialTx, initialTy).scale(initialScale));

    // --- DRAWING ---

    // 0. Heatmap Layer (Background)
    if (showHeatmapLayer) {
        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "blur")
            .append("feGaussianBlur")
            .attr("stdDeviation", 15);

        g.selectAll(".heat-zone")
            .data(locations)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.crowdLevel === 'high' ? 80 : d.crowdLevel === 'moderate' ? 60 : 40)
            .attr("fill", d => d.crowdLevel === 'high' ? '#ef4444' : d.crowdLevel === 'moderate' ? '#eab308' : '#22c55e')
            .attr("opacity", 0.4)
            .attr("filter", "url(#blur)");
    }

    // 1. The Central Axis Line
    g.append("line")
      .attr("x1", 500)
      .attr("y1", locations[0].y)
      .attr("x2", 500)
      .attr("y2", locations[locations.length - 1].y)
      .attr("stroke", COLORS.accentRed)
      .attr("stroke-width", transportMode === 'walking' ? 4 : 2)
      .attr("stroke-dasharray", transportMode === 'walking' ? "0" : "10,5")
      .attr("opacity", 0.6);

    // 2. Transport Route
    if (transportMode === 'transit') {
      const lineGenerator = d3.line<Spot>()
        .x(d => d.x + (d.id % 2 === 0 ? 60 : -60))
        .y(d => d.y)
        .curve(d3.curveCatmullRom.alpha(0.5));

      g.append("path")
        .datum(locations)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", COLORS.accentBlue)
        .attr("stroke-width", 3)
        .attr("opacity", 0.8);
    }

    // 3. Locations (Nodes)
    const nodes = g.selectAll(".node")
      .data(locations)
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => {
        event.stopPropagation();
        onSpotClick(d);
      });

    // Outer ring (Pulse effect)
    nodes.append("circle")
      .attr("r", 12)
      .attr("fill", COLORS.accentRed)
      .attr("opacity", 0.2)
      .append("animate")
      .attr("attributeName", "r")
      .attr("from", "12")
      .attr("to", "20")
      .attr("dur", "2s")
      .attr("repeatCount", "indefinite");

    // Main Dot
    nodes.append("circle")
      .attr("r", 8)
      .attr("fill", d => d.id === selectedSpotId ? COLORS.accentBlue : COLORS.accentRed)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("class", "transition-colors duration-300");

    // Labels
    nodes.append("text")
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .text(d => d.name)
      .attr("fill", COLORS.accentRed)
      .attr("font-family", "Ma Shan Zheng, cursive")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .style("text-shadow", "0px 0px 4px rgba(255,255,255,0.8)");

    // Hover interactions
    nodes.on("mouseenter", function() {
      d3.select(this).select("circle:nth-child(2)")
        .attr("r", 12)
        .attr("fill", COLORS.accentBlue);
      d3.select(this).select("text")
        .attr("font-size", "20px");
    }).on("mouseleave", function(event, d) {
      d3.select(this).select("circle:nth-child(2)")
        .attr("r", 8)
        .attr("fill", d.id === selectedSpotId ? COLORS.accentBlue : COLORS.accentRed);
      d3.select(this).select("text")
        .attr("font-size", "16px");
    });

  }, [locations, selectedSpotId, transportMode, onSpotClick, showHeatmapLayer]);

  return (
    <div ref={containerRef} className="w-full h-full bg-axis-bg bg-paper-texture overflow-hidden relative">
        {/* Decorative Compass */}
        <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#862617" strokeWidth="2" fill="none"/>
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="#862617" strokeWidth="1"/>
                <text x="50" y="25" textAnchor="middle" fill="#862617" className="font-serif-sc">北</text>
            </svg>
        </div>

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-axis-sub/90 p-3 rounded border border-axis-accentRed/30 backdrop-blur-sm shadow-md font-serif-sc text-sm text-axis-accentRed space-y-1">
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-axis-accentRed border border-white"></span>
            <span>景点位置</span>
        </div>
        {!showHeatmapLayer ? (
          <>
            <div className="flex items-center gap-2">
                <span className="w-8 h-1 bg-axis-accentRed"></span>
                <span>中轴线 (步行)</span>
            </div>
            {transportMode === 'transit' && (
                <div className="flex items-center gap-2">
                    <span className="w-8 h-1 bg-axis-accentBlue border-t border-b border-transparent border-dashed"></span>
                    <span>公交接驳</span>
                </div>
            )}
          </>
        ) : (
           <div className="mt-2 pt-2 border-t border-axis-accentRed/20">
               <div className="text-xs font-bold mb-1">人流热力</div>
               <div className="flex items-center gap-2 text-xs">
                   <span className="w-3 h-3 rounded-full bg-green-500"></span> 舒适
                   <span className="w-3 h-3 rounded-full bg-yellow-500"></span> 适中
                   <span className="w-3 h-3 rounded-full bg-red-500"></span> 拥挤
               </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default MapCanvas;