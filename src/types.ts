export type LightType = 'directional' | 'point';

export interface LightState {
  id: string;
  type: LightType;
  name: string;
  color: string;
  intensity: number;
  azimuth: number;
  elevation: number;
  distance: number;
}
