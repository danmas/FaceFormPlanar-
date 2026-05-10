import React from 'react';
import { RefreshCw, Sun, Palette } from 'lucide-react';

interface SidebarProps {
  pitch: number; setPitch: (v: number) => void;
  yaw: number; setYaw: (v: number) => void;
  lightX: number; setLightX: (v: number) => void;
  lightY: number; setLightY: (v: number) => void;
  fidelity: 'LOW' | 'MID' | 'FULL'; setFidelity: (v: 'LOW' | 'MID' | 'FULL') => void;
  wireframe: boolean; setWireframe: (v: boolean) => void;
  guides: boolean; setGuides: (v: boolean) => void;
  resetStage: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  materialColor: string; setMaterialColor: (v: string) => void;
  roughness: number; setRoughness: (v: number) => void;
  metalness: number; setMetalness: (v: number) => void;
}

export default function Sidebar({
  pitch, setPitch,
  yaw, setYaw,
  lightX, setLightX,
  lightY, setLightY,
  fidelity, setFidelity,
  wireframe, setWireframe,
  guides, setGuides,
  resetStage,
  handleFileUpload,
  materialColor, setMaterialColor,
  roughness, setRoughness,
  metalness, setMetalness
}: SidebarProps) {

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
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Horizontal Pos</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{lightX.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-10" max="10" step="0.1" value={lightX} 
                onChange={(e) => setLightX(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-normal">
                <span>Vertical Pos</span>
                <span className="text-accent bg-surface/50 px-2 py-0.5 rounded-sm border border-border font-mono">{lightY.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-10" max="10" step="0.1" value={lightY} 
                onChange={(e) => setLightY(Number(e.target.value))}
                className="w-full h-[2px] bg-border rounded-none appearance-none cursor-pointer outline-none accent-accent"
              />
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
