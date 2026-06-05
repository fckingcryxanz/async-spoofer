'use client';

import { useState } from 'react';
import FileUploader from '../components/FileUploader';

export default function SettingsPage() {
  const [autoRemap, setAutoRemap] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="flex h-screen bg-[#06060a] text-[#e1e1e6] overflow-hidden font-sans select-none">
      
      {/* ЛЕВОЕ МЕНЮ (SIDEBAR) */}
      <aside className="w-60 bg-[#0c0c14] border-r border-white/5 flex flex-col justify-between text-sm">
        <div className="overflow-y-auto custom-scrollbar py-5 px-4 space-y-6">
          
          {/* Логотип */}
          <div className="px-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-widest text-white">ECLIPSE</h1>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 uppercase">Web</span>
            </div>
            <p className="text-[10px] text-purple-400/80 font-bold tracking-widest uppercase mt-1">Async Edition</p>
          </div>

          {/* Навигация */}
          <nav className="space-y-4">
            {/* Группа MAIN */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider px-2 mb-2">Main</p>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Tutorial</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Studio</span>
              </button>
            </div>

            {/* Группа TOOLS */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider px-2 mb-2">Tools</p>
              {['Ripper', 'Manual', 'Upload', 'Audio', 'Mesh', 'Products'].map((tool) => (
                <button key={tool} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <span>{tool}</span>
                  {tool !== 'Upload' && <span className="text-[8px] font-extrabold px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">Pro</span>}
                </button>
              ))}
            </div>

            {/* Группа CONFIG */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider px-2 mb-2">Config</p>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Group</span>
                <span className="text-[8px] font-extrabold px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">Pro</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Themes</span>
                <span className="text-[8px] font-extrabold px-1 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">Pro</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Hub</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-purple-600/10 border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.05)] transition-all">
                <span>Settings</span>
              </button>
            </div>

            {/* Группа LOGS */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider px-2 mb-2">Logs</p>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>History</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <span>Log</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Подвал меню */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span>v2.6.0 — Async Studio</span>
          <span className="text-green-400 flex items-center gap-1"><span className="w-1 h-1 bg-green-400 rounded-full animate-ping" /> FREE</span>
        </div>
      </aside>

      {/* ОСНОВНАЯ ПАНЕЛЬ С НАСТРОЙКАМИ */}
      <main className="flex-1 bg-[#09090f] p-8 overflow-y-auto space-y-6 custom-scrollbar">
        
        {/* 1. SECTION: ACCOUNT PROFILES */}
        <section className="bg-[#0c0c14]/50 border border-white/5 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Account Profiles</span>
          </div>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Profile name (e.g. Main Account)" 
              className="flex-1 bg-[#06060a] border border-white/5 focus:border-purple-500/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-gray-600"
            />
            <button className="bg-[#141420] hover:bg-[#1a1a2c] border border-white/5 text-gray-400 hover:text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors">
              Save Profile
            </button>
          </div>
          <p className="text-[11px] text-gray-500">Enter your credentials below first, then type a name and save. Each profile stores its own API key, cookie, User ID, and Group ID.</p>
        </section>

        {/* 2. SECTION: ACCOUNT */}
        <section className="bg-[#0c0c14]/50 border border-white/5 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account</span>
          </div>

          {/* User ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">User ID</label>
            <input 
              type="text" 
              placeholder="Auto-detected from cookie" 
              disabled 
              className="w-full bg-[#06060a]/50 border border-white/5 text-gray-500 rounded-lg px-4 py-2.5 text-sm cursor-not-allowed" 
            />
          </div>

          {/* Cookie */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">Cookie (.ROBLOSECURITY)</label>
            <input 
              type="password" 
              placeholder="Paste your .ROBLOSECURITY cookie" 
              className="w-full bg-[#06060a] border border-white/5 focus:border-purple-500/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-gray-600 font-mono" 
            />
            <p className="text-[10px] text-purple-400/60 font-semibold uppercase tracking-wide">PRO Stored only in your browser's localStorage — never sent to our servers</p>
          </div>

          {/* Group ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">Group ID</label>
            <input 
              type="text" 
              placeholder="Leave blank for personal uploads" 
              className="w-full bg-[#06060a] border border-white/5 focus:border-purple-500/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-gray-600" 
            />
            <p className="text-[11px] text-gray-500">Must match the group that owns the game for animations to work in-game</p>
          </div>
        </section>

        {/* 3. SECTION: OPEN CLOUD API KEY */}
        <section className="bg-[#0c0c14]/50 border border-white/5 rounded-xl p-5 space-y-4">
          <div className="border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Open Cloud API Key</span>
          </div>
          
          <div className="bg-red-500/5 border border-red-500/10 text-red-400 text-[11px] rounded-lg px-4 py-2.5 flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            API Key Required — uploads won't work without this
          </div>

          <div className="flex gap-2">
            <input 
              type={showApiKey ? "text" : "password"} 
              placeholder="Paste your Open Cloud API key" 
              className="flex-1 bg-[#06060a] border border-white/5 focus:border-purple-500/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-gray-600 font-mono"
            />
            <button 
              onClick={() => setShowApiKey(!showApiKey)}
              className="bg-[#141420] hover:bg-[#1a1a2c] border border-white/5 text-gray-400 hover:text-white px-4 rounded-lg text-xs font-semibold transition-colors"
            >
              {showApiKey ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-colors">
              Get API Key
            </button>
            <button className="bg-[#141420] hover:bg-[#1a1a2c] border border-white/5 text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
              ? Setup Guide
            </button>
          </div>
        </section>

        {/* 4. SECTION: REMAPPING */}
        <section className="bg-[#0c0c14]/50 border border-white/5 rounded-xl p-5 space-y-3">
          <div className="border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Remapping</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-gray-200">Auto-Remap</h4>
              <p className="text-[11px] text-gray-500">Automatically remap assets in Studio when spoofing completes. Requires Studio plugin to be connected.</p>
            </div>
            
            <button 
              onClick={() => setAutoRemap(!autoRemap)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${autoRemap ? 'bg-purple-500' : 'bg-white/10'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${autoRemap ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* 5. NEW ASSET UPLOADER SECTION (Тот самый обход 25 МБ) */}
        <section>
          <FileUploader />
        </section>

        {/* КНОПКИ ДЕЙСТВИЯ */}
        <div className="flex gap-2 pt-4 border-t border-white/5">
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-[0_0_25px_rgba(147,51,234,0.2)] transition-all">
            Save Settings
          </button>
          <button className="bg-[#141420] hover:bg-[#1a1a2c] border border-white/5 text-gray-400 hover:text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors">
            ↶ Reset
          </button>
        </div>

      </main>
    </div>
  );
}