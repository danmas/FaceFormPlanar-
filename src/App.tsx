/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeadCanvas from './components/HeadCanvas';
import { RotateCw, Sparkles, HelpCircle } from 'lucide-react';
import { LightState } from './types';

export default function App() {
  const [modelScale, setModelScale] = useState(1);
  const [modelOffsetX, setModelOffsetX] = useState(0);
  const [modelOffsetY, setModelOffsetY] = useState(0);
  const [modelOffsetZ, setModelOffsetZ] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [lights, setLights] = useState<LightState[]>([
    { id: 'main', type: 'directional', name: 'Main Light', color: '#ffffff', intensity: 2, azimuth: 45, elevation: 30, distance: 5 },
    { id: 'fill', type: 'point', name: 'Fill Light', color: '#d4af37', intensity: 1, azimuth: -135, elevation: -25, distance: 4.6 },
    { id: 'rim', type: 'point', name: 'Rim Light', color: '#808080', intensity: 0.5, azimuth: 135, elevation: 35, distance: 5.1 },
  ]);
  const [selectedLightId, setSelectedLightId] = useState<string | null>(null);
  const [fidelity, setFidelity] = useState<'LOW' | 'MID' | 'FULL'>('LOW');
  const [wireframe, setWireframe] = useState(false);
  const [guides, setGuides] = useState(true);
  const [customModelUrl, setCustomModelUrl] = useState<string | null>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [materialColor, setMaterialColor] = useState('#1c1c1f');
  const [roughness, setRoughness] = useState(0.6);
  const [metalness, setMetalness] = useState(0.1);
  const [ambientIntensity, setAmbientIntensity] = useState(0.8);
  const [showLights, setShowLights] = useState(true);
  const [fixLightToCamera, setFixLightToCamera] = useState(true);
  const [showAxes, setShowAxes] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const resetStage = () => {
    setModelScale(1);
    setModelOffsetX(0);
    setModelOffsetY(0);
    setModelOffsetZ(0);
    setPitch(0);
    setYaw(0);
    setLights([
      { id: 'main', type: 'directional', name: 'Main Light', color: '#ffffff', intensity: 2, azimuth: 45, elevation: 30, distance: 5 },
      { id: 'fill', type: 'point', name: 'Fill Light', color: '#d4af37', intensity: 1, azimuth: -135, elevation: -25, distance: 4.6 },
      { id: 'rim', type: 'point', name: 'Rim Light', color: '#808080', intensity: 0.5, azimuth: 135, elevation: 35, distance: 5.1 },
    ]);
    setSelectedLightId(null);
    setFidelity('LOW');
    setWireframe(false);
    setGuides(true);
    setCustomModelUrl(null);
    setUploadedFileName(null);
    setShowInsight(false);
    setMaterialColor('#1c1c1f');
    setRoughness(0.6);
    setMetalness(0.1);
    setAmbientIntensity(0.8);
    setShowLights(true);
    setFixLightToCamera(true);
    setShowAxes(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomModelUrl(url);
      setUploadedFileName(file.name);
      setFidelity('FULL'); // Switch to full to see the model
      
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const allSettings = await res.json();
          if (allSettings[file.name]) {
            const s = allSettings[file.name];
            if (s.scale !== undefined) setModelScale(s.scale);
            if (s.offsetX !== undefined) setModelOffsetX(s.offsetX);
            if (s.offsetY !== undefined) setModelOffsetY(s.offsetY);
            if (s.offsetZ !== undefined) setModelOffsetZ(s.offsetZ);
          } else {
            // Reset to defaults if no settings
            setModelScale(1);
            setModelOffsetX(0);
            setModelOffsetY(0);
            setModelOffsetZ(0);
          }
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      }
    }
  };

  const handleSaveShift = async () => {
    if (!uploadedFileName) return;
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: uploadedFileName,
          settings: {
            scale: modelScale,
            offsetX: modelOffsetX,
            offsetY: modelOffsetY,
            offsetZ: modelOffsetZ
          }
        })
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg text-text font-sans overflow-hidden">
      {/* Sidebar Controls */}
      <Sidebar 
        modelScale={modelScale} setModelScale={setModelScale}
        modelOffsetX={modelOffsetX} setModelOffsetX={setModelOffsetX}
        modelOffsetY={modelOffsetY} setModelOffsetY={setModelOffsetY}
        modelOffsetZ={modelOffsetZ} setModelOffsetZ={setModelOffsetZ}
        pitch={pitch} setPitch={setPitch}
        yaw={yaw} setYaw={setYaw}
        lights={lights} setLights={setLights}
        selectedLightId={selectedLightId} setSelectedLightId={setSelectedLightId}
        fidelity={fidelity} setFidelity={setFidelity}
        wireframe={wireframe} setWireframe={setWireframe}
        guides={guides} setGuides={setGuides}
        resetStage={resetStage}
        handleFileUpload={handleFileUpload}
        handleSaveShift={handleSaveShift}
        uploadedFileName={uploadedFileName}
        materialColor={materialColor} setMaterialColor={setMaterialColor}
        roughness={roughness} setRoughness={setRoughness}
        metalness={metalness} setMetalness={setMetalness}
        ambientIntensity={ambientIntensity} setAmbientIntensity={setAmbientIntensity}
        showLights={showLights} setShowLights={setShowLights}
        showAxes={showAxes} setShowAxes={setShowAxes}
        fixLightToCamera={fixLightToCamera} setFixLightToCamera={setFixLightToCamera}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center">
        {/* Header Overlay */}
        <header className="absolute top-0 left-0 w-full h-[60px] border-b border-border bg-surface flex justify-between items-center px-6 pointer-events-none z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 font-serif text-accent flex items-center justify-center">
              <RotateCw size={18} />
            </div>
            <div>
              <h1 className="font-serif text-lg font-light tracking-[2px] text-accent">ANATOMIA STUDIO</h1>
              <p className="text-[10px] text-text-dim uppercase tracking-widest font-mono">FaceForm Planar</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pointer-events-auto">
            <button className="flex items-center gap-2 px-4 py-1.5 border border-border hover:bg-accent/10 rounded-sm transition-colors text-xs font-mono text-accent">
              <Sparkles size={14} />
              AI Insights
            </button>
            <button className="flex items-center justify-center w-8 h-8 border border-border text-text-dim hover:text-accent hover:border-accent transition-colors rounded-sm">
              <HelpCircle size={16} />
            </button>
          </div>
        </header>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1c1c1f_0%,_#0a0a0a_100%)]">
           <HeadCanvas 
             modelScale={modelScale}
             modelOffsetX={modelOffsetX}
             modelOffsetY={modelOffsetY}
             modelOffsetZ={modelOffsetZ}
             pitch={pitch} yaw={yaw}
             lights={lights} setLights={setLights}
             selectedLightId={selectedLightId} setSelectedLightId={setSelectedLightId}
             fidelity={fidelity}
             wireframe={wireframe}
             guides={guides}
             setPitch={setPitch}
             setYaw={setYaw}
             customModelUrl={customModelUrl}
             materialColor={materialColor}
             roughness={roughness}
             metalness={metalness}
             ambientIntensity={ambientIntensity}
             showLights={showLights}
             showAxes={showAxes}
             fixLightToCamera={fixLightToCamera}
           />
        </div>

        {/* Bottom Overlay Tooltip */}
        <div className="absolute bottom-8 left-8 z-10 pointer-events-auto">
          <div className="bg-bg shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-sm border border-border p-6 w-[280px] flex flex-col gap-4">
            <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-text-dim text-center">Study the planes</p>
            <button 
              onClick={() => setShowInsight(true)}
              className="w-full py-3 bg-surface border border-border hover:bg-accent hover:text-bg text-text text-xs uppercase font-mono tracking-wider transition-colors rounded-sm shadow-md"
            >
              GENERATE STRUCTURAL INSIGHT
            </button>
          </div>
        </div>

        {/* Insight Modal */}
        {showInsight && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pointer-events-auto">
            <div className="bg-surface border border-border rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] max-w-2xl w-full p-8 relative">
              <button 
                onClick={() => setShowInsight(false)}
                className="absolute top-4 right-4 text-text-dim hover:text-accent transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
              </button>
              
              <div className="flex items-center gap-3 mb-6 text-accent">
                <Sparkles size={24} />
                <h2 className="text-2xl font-serif font-light tracking-wide">AI Structural Insight</h2>
              </div>
              
              <div className="space-y-4 text-text leading-relaxed font-sans font-light">
                <p><strong className="text-accent font-normal">Полигональность и Детализация (Level of Detail):</strong></p>
                <p>Вы спросили: <em className="text-text-dim">"Сколько минимально для головы нужно, чтобы детали губ, глаз, носа были видны?"</em></p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-text-dim">
                  <li><strong className="text-text font-normal">Loomis (LOW):</strong> Детали лица НЕ НУЖНЫ. Эта стадия — шар черепа (cranium) обрезанный с боков, плюс блок челюсти. Цель: понять общий объем и перспективу.</li>
                  <li><strong className="text-text font-normal">Planar/Азаро (MID):</strong> Чтобы обозначить орбиты глаз, скулы, плоскости носа и губ, требуется около <strong>30-50 крупных плоскостей</strong> (полигонов). Это минимально необходимый уровень (как на референсе) для изучения распределения света и тени по чертам лица.</li>
                  <li><strong className="text-text font-normal">Full Detail (FULL):</strong> Сотни или тысячи полигонов, сглаженные (smooth shading). Здесь формы становятся органическими, но для <em>изучения рисунка</em> они менее полезны, чем четкие рубленые плоскости Азаро.</li>
                </ul>
                <div className="bg-surface-dim p-4 border border-border rounded-sm mt-6 text-sm font-mono text-accent/80">
                  <span className="text-accent">💡 Практический совет:</span> Используйте слайдеры Light Studio (Освещение), чтобы перемещать источник света. Переключайтесь в Wireframe, чтобы лучше понимать топологию плоскостей на поворотах! Если у вас есть собственная 3D-модель (.glb/.gltf), вы можете загрузить её через боковую панель.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
