import React from 'react';
import { RefreshCw, Sun, Palette, X } from 'lucide-react';
import { LightState, LightType } from '../types';

interface SidebarProps {
  pitch: number; setPitch: (v: number) => void;
  yaw: number; setYaw: (v: number) => void;
  lights: LightState[]; setLights: (v: LightState[]) => void;
  selectedLightId: string | null; setSelectedLightId: (v: string | null) => void;
  fidelity: 'LOW' | 'MID' | 'FULL'; setFidelity: (v: 'LOW' | 'MID' | 'FULL') => void;
  wireframe: boolean; setWireframe: (v: boolean) => void;
  guides: boolean; setGuides: (v: boolean) => void;
  resetStage: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  materialColor: string; setMaterialColor: (v: string) => void;
  roughness: number; setRoughness: (v: number) => void;
  metalness: number; setMetalness: (v: number) => void;
  ambientIntensity: number; setAmbientIntensity: (v: number) => void;
  showLights: boolean; setShowLights: (v: boolean) => void;
  fixLightToCamera: boolean; setFixLightToCamera: (v: boolean) => void;
}

export default function Sidebar({
  pitch, setPitch,
  yaw, setYaw,
  lights, setLights,
  selectedLightId, setSelectedLightId,
  fidelity, setFidelity,
  wireframe, setWireframe,
  guides, setGuides,
  resetStage,
  handleFileUpload,
  materialColor, setMaterialColor,
  roughness, setRoughness,
  metalness, setMetalness,
  ambientIntensity, setAmbientIntensity,
  showLights, setShowLights,
  fixLightToCamera, setFixLightToCamera
}: SidebarProps) {
  
  const selectedLight = lights.find(l => l.id === selectedLightId);

  const updateLight = (id: string, updates: Partial<LightState>) => {
    setLights(lights.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  return (
    <aside className="w-[320px] bg-surface-dim border-r border-border flex flex-col h-full z-20 overflow-y-auto relative backdrop-blur-md">
      <div className="flex-1 p-6 pt-20 flex flex-col gap-10">
        
        {/* Orientation Group */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-text-dim text-[11px] font-semibold tracking-[1.5px] uppercase">
            <RefreshCw size={14} />
            <span>Orientation</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Pitch (X)</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{pitch}°</span>
              </div>
              <input 
                type="range" min="-90" max="90" value={pitch} 
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Yaw (Y)</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{yaw}°</span>
              </div>
              <input 
                type="range" min="-180" max="180" value={yaw} 
                onChange={(e) => setYaw(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
            </div>
          </div>
        </div>

        {/* Light Studio Group */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-text-dim text-[11px] font-semibold tracking-[1.5px] uppercase">
            <Sun size={14} />
            <span>Light Studio</span>
          </div>

          <div className="space-y-4">
            
            {selectedLightId && selectedLight ? (
              <div className="space-y-4 bg-surface rounded-sm border border-border p-3 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold">{selectedLight.name}</span>
                  <button onClick={() => setSelectedLightId(null)} className="text-text-dim hover:text-text cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Intensity</span>
                    <span className="text-accent bg-bg/50 px-2 py-0.5 rounded-sm border border-border font-mono">{selectedLight.intensity.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.1" value={selectedLight.intensity} 
                    onChange={(e) => updateLight(selectedLight.id, { intensity: Number(e.target.value) })}
                    className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Azimuth</span>
                    <span className="text-accent bg-bg/50 px-2 py-0.5 rounded-sm border border-border font-mono">{selectedLight.azimuth.toFixed(1)}°</span>
                  </div>
                  <input 
                    type="range" min="-180" max="180" step="1" value={selectedLight.azimuth} 
                    onChange={(e) => updateLight(selectedLight.id, { azimuth: Number(e.target.value) })}
                    className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Elevation</span>
                    <span className="text-accent bg-bg/50 px-2 py-0.5 rounded-sm border border-border font-mono">{selectedLight.elevation.toFixed(1)}°</span>
                  </div>
                  <input 
                    type="range" min="-90" max="90" step="1" value={selectedLight.elevation} 
                    onChange={(e) => updateLight(selectedLight.id, { elevation: Number(e.target.value) })}
                    className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
                  />
                </div>
                
                {selectedLight.type === 'point' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-normal">
                      <span>Distance</span>
                      <span className="text-accent bg-bg/50 px-2 py-0.5 rounded-sm border border-border font-mono">{selectedLight.distance.toFixed(1)}</span>
                    </div>
                    <input 
                      type="range" min="1" max="15" step="0.1" value={selectedLight.distance} 
                      onChange={(e) => updateLight(selectedLight.id, { distance: Number(e.target.value) })}
                      className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Color</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-6 h-6 rounded-full border border-border overflow-hidden cursor-pointer" style={{ backgroundColor: selectedLight.color }}>
                      <input 
                        type="color" 
                        value={selectedLight.color} 
                        onChange={e => updateLight(selectedLight.id, { color: e.target.value })} 
                        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 p-0 border-0 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <>
                {/* Global Setup */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Select Light</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {lights.map(light => (
                      <button 
                         key={light.id}
                         onClick={() => setSelectedLightId(light.id)}
                         className="flex items-center gap-2 py-2 px-3 bg-surface border border-border text-xs text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-left"
                      >
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: light.color }} />
                         {light.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Presets (Main Light)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => updateLight('main', { azimuth: 0, elevation: 0 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Front</button>
                    <button 
                      onClick={() => updateLight('main', { azimuth: 0, elevation: 60 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Top</button>
                    <button 
                      onClick={() => updateLight('main', { azimuth: 45, elevation: 30 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Rembrandt</button>
                    <button 
                      onClick={() => updateLight('main', { azimuth: -90, elevation: 10 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Side L</button>
                    <button 
                      onClick={() => updateLight('main', { azimuth: 90, elevation: 10 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Side R</button>
                    <button 
                      onClick={() => updateLight('main', { azimuth: 0, elevation: -45 })}
                      className="py-1.5 bg-surface border border-border text-[9px] text-text hover:text-accent hover:border-accent rounded-sm transition-colors text-center uppercase tracking-widest"
                    >Under</button>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center text-xs font-normal">
                    <span>Fill Light (Ambient)</span>
                    <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{ambientIntensity.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="3" step="0.1" value={ambientIntensity} 
                    onChange={(e) => setAmbientIntensity(Number(e.target.value))}
                    className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
                  />
                </div>
              </>
            )}

            {/* Light Option Toggles */}
            <div className="flex justify-between items-center pt-2">
               <span className="uppercase tracking-[1.5px] text-text-dim text-[11px]">Show Lights</span>
               <button 
                 onClick={() => setShowLights(!showLights)}
                 className={`w-[40px] h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${showLights ? 'bg-accent' : 'bg-surface border border-border'}`}
               >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out absolute top-[1px] ${showLights ? 'translate-x-5' : 'translate-x-0'}`} />
               </button>
            </div>

            <div className="flex justify-between items-center pt-2">
               <span className="uppercase tracking-[1.5px] text-text-dim text-[11px]">Lock to Camera</span>
               <button 
                 onClick={() => setFixLightToCamera(!fixLightToCamera)}
                 className={`w-[40px] h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${fixLightToCamera ? 'bg-accent' : 'bg-surface border border-border'}`}
               >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out absolute top-[1px] ${fixLightToCamera ? 'translate-x-5' : 'translate-x-0'}`} />
               </button>
            </div>
          </div>
        </div>

        {/* Materials Group */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-text-dim text-[11px] font-semibold tracking-[1.5px] uppercase">
            <Palette size={14} />
            <span>Material</span>
          </div>

          <div className="space-y-4">
            {/* Color picker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Base Color</span>
              </div>
              <div className="flex gap-2">
                {['#1c1c1f', '#d0cbc3', '#8a8a8a', '#d4af37'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setMaterialColor(c)}
                    className={`w-6 h-6 rounded-full border border-border p-0 cursor-pointer ${materialColor === c ? 'ring-2 ring-accent ring-offset-1 ring-offset-surface-dim' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
                <div className="relative w-6 h-6 rounded-full border border-border overflow-hidden cursor-pointer">
                  <input 
                    type="color" 
                    value={materialColor} 
                    onChange={e => setMaterialColor(e.target.value)} 
                    className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 p-0 border-0 cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            {/* Roughness */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Roughness</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{roughness.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={roughness} 
                onChange={(e) => setRoughness(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
            </div>

            {/* Metalness */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Metalness</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{metalness.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={metalness} 
                onChange={(e) => setMetalness(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
            </div>
          </div>
        </div>

        {/* View Style Group */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-text-dim text-[11px] font-semibold tracking-[1.5px] uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <span>View Style</span>
          </div>

          <div className="space-y-6 text-xs font-normal">
            <div className="space-y-3">
              <span className="text-text-dim">Planar Fidelity</span>
              <div className="flex rounded-sm p-1 bg-surface border border-border w-full overflow-hidden">
                {['LOW', 'MID', 'FULL'].map((level) => (
                  <button 
                    key={level}
                    onClick={() => setFidelity(level as any)}
                    className={`flex-1 py-1.5 text-xs text-center rounded-sm transition-all duration-200 tracking-[1px] uppercase ${fidelity === level ? 'bg-accent shadow-sm text-bg font-semibold' : 'text-text hover:text-accent font-normal'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
               <span className="uppercase tracking-[1.5px] text-text-dim text-[11px]">Wireframe</span>
               <button 
                 onClick={() => setWireframe(!wireframe)}
                 className={`w-[40px] h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${wireframe ? 'bg-accent' : 'bg-surface border border-border'}`}
               >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out absolute top-[1px] ${wireframe ? 'translate-x-5' : 'translate-x-0'}`} />
               </button>
            </div>

            <div className="flex justify-between items-center pt-2">
               <span className="uppercase tracking-[1.5px] text-text-dim text-[11px]">Guides</span>
               <button 
                 onClick={() => setGuides(!guides)}
                 className={`w-[40px] h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out relative ${guides ? 'bg-accent' : 'bg-surface border border-border'}`}
               >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out absolute top-[1px] ${guides ? 'translate-x-5' : 'translate-x-0'}`} />
               </button>
            </div>

            {/* Custom Model Upload */}
            <div className="pt-6">
              <label className="flex items-center justify-center w-full py-2.5 bg-transparent border border-border hover:bg-surface text-text text-[11px] uppercase tracking-[1px] cursor-pointer rounded-sm transition-colors">
                <span>Upload Custom .glb</span>
                <input type="file" accept=".glb,.gltf" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

          </div>
        </div>

      </div>

      <div className="p-6 border-t border-border">
         <button onClick={resetStage} className="w-full py-3 bg-transparent hover:bg-surface border border-border rounded-sm text-[11px] text-text-dim tracking-[1.5px] uppercase transition-colors shadow-none">
            Reset Stage
         </button>
      </div>

    </aside>
  );
}
