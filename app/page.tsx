'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';

export default function SettingsPage() {
  const [autoRemap, setAutoRemap] = useState(false);

  return (
    <div className="flex h-screen bg-[#050507] text-white overflow-hidden font-sans">
      
      {/* 1. БОКОВОЕ МЕНЮ (SIDEBAR) */}
      <aside className="w-64 bg-[#0a0a0f]/60 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col justify-between">
        <div>
          {/* Логотип бренда */}
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500">
              ASYNC
            </h1>
            <p className="text-[10px] text-purple-400/60 uppercase tracking-widest font-bold mt-0.5">Web Edition</p>
          </div>

          {/* Навигация с SVG-иконками */}
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-2">Основное</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="9" rx="1" />
                <rect x="14" y="3" width="7" height="5" rx="1" />
                <rect x="14" y="12" width="7" height="9" rx="1" />
                <rect x="3" y="16" width="7" height="5" rx="1" />
              </svg>
              Дашборд
            </button>

            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 pt-4 mb-2">Инструменты</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              Загрузчик ассетов
            </button>

            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 pt-4 mb-2">Конфигурация</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600/10 border border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)] transition-all">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Настройки
            </button>
          </nav>
        </div>

        <div className="px-2 text-xs text-gray-600 font-mono">v1.0.0 — Async Studio</div>
      </aside>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 p-8 overflow-y-auto space-y-6">
        
        {/* Хедер страницы */}
        <div className="border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold tracking-tight">Настройки конфигурации</h2>
          <p className="text-xs text-gray-400 mt-1">Управление профилями, интеграциями окружения и параметрами проекта.</p>
        </div>

        {/* СЕКЦИЯ 1: ПРОФИЛИ (ACCOUNT PROFILES) */}
        <section className="bg-[#0b0b11]/80 border border-white/5 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Профили аккаунтов</h3>
          </div>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Название профиля (например, Основной аккаунт)" 
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
            />
            <button className="bg-purple-600 hover:bg-purple-500 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)]">
              Сохранить профиль
            </button>
          </div>
        </section>

        {/* СЕКЦИЯ 2: ДАННЫЕ ПРОЕКТА (ACCOUNT DATA) */}
        <section className="bg-[#0b0b11]/80 border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Параметры окружения</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Идентификатор проекта (Project ID)</label>
              <input type="text" placeholder="Автоопределение системы" disabled className="w-full bg-black/20 border border-white/5 text-gray-500 rounded-xl px-4 py-2.5 text-sm cursor-not-allowed" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Глобальный ID Группы (Group ID)</label>
              <input type="text" placeholder="Оставьте пустым для персональных конфигураций" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600" />
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 3: КЛЮЧИ АВТОРИЗАЦИИ (OPEN CLOUD API KEY) */}
        <section className="bg-[#0b0b11]/80 border border-white/5 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Open Cloud API Key</h3>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Требуется API Ключ — без него автоматическая синхронизация со Studio не будет работать.
          </div>

          <div className="flex gap-2">
            <input 
              type="password" 
              placeholder="Введи свой Open Cloud API key" 
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600 font-mono"
            />
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 rounded-xl text-sm font-medium transition-colors">
              Показать
            </button>
          </div>

          <div className="flex gap-3 pt-1">
            <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl text-xs font-medium transition-colors">
              Получить API Ключ
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-xs font-medium transition-colors">
              Инструкция по настройке
            </button>
          </div>
        </section>

        {/* СЕКЦИЯ 4: ХРАНИЛИЩЕ И КРУПНЫЕ ФАЙЛЫ */}
        <section>
          {/* Сюда мы интегрируем наш загрузчик без ограничений на 25мб */}
          <FileUploader />
        </section>

        {/* СЕКЦИЯ 5: ПЕРЕНАЗНАЧЕНИЕ (REMAPPING) */}
        <section className="bg-[#0b0b11]/80 border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold text-gray-200">Автоматический ремаппинг (Auto-Remap)</h4>
            <p className="text-xs text-gray-500">Автоматически переназначать измененные ассеты в Studio после завершения синхронизации.</p>
          </div>
          
          {/* Кастомный переключатель (Toggle) */}
          <button 
            onClick={() => setAutoRemap(!autoRemap)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${autoRemap ? 'bg-purple-600' : 'bg-white/10'}`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${autoRemap ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </section>

        {/* КНОПКИ ДЕЙСТВИЯ */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-3 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all">
            Сохранить настройки
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            Сбросить
          </button>
        </div>

      </main>
    </div>
  );
}