export interface Spot {
  id: number;
  name: string;
  x: number; // Relative X coordinate for map
  y: number; // Relative Y coordinate for map
  description: string;
  recommendedTimes: string[];
  crowdLevel: 'low' | 'moderate' | 'high';
}

export type TransportMode = 'walking' | 'transit';

export interface HeatmapDataPoint {
  time: string;
  density: number; // 0-100
  predicted: number; // 0-100
}

export interface RouteSegment {
  fromId: number;
  toId: number;
  distance: string;
  timeWalking: string;
  timeTransit: string;
}

export interface UserProfile {
  name: string;
  tags: string[];
  preferences: {
    crowdAvoidance: boolean;
    walkingTolerance: number; // km
  }
}

export type SidebarTab = 'explore' | 'routes' | 'heatmap' | 'time' | 'user';

export interface GeneratedRoute {
  id: number;
  name: string;
  duration: string;
  mode: TransportMode;
  tags: string[];
  stops: number[]; // Spot IDs
}