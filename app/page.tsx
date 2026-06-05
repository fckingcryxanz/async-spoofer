export default function Dashboard() {
  return (
    <div className="flex h-screen p-4 gap-4">
      
      {/* Боковое меню Async */}
      <aside className="glass-panel w-64 rounded-3xl p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            ASYNC
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Dashboard</p>
        </div>

        <nav className="flex flex-col gap-2">
          {/* Пример пункта меню с SVG */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium text-gray-300 hover:text-white text-left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Главная
          </button>
          
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-medium text-gray-300 hover:text-white text-left mt-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Настройки
          </button>
        </nav>
      </aside>

      {/* Основная рабочая область */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Верхняя панель (Header) */}
        <header className="glass-panel h-20 rounded-3xl flex items-center px-8">
          <h2 className="text-xl font-medium">Конфигурация проекта</h2>
        </header>

        {/* Область контента */}
        <div className="glass-panel flex-1 rounded-3xl p-8 overflow-y-auto">
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium mb-6">Профиль</h3>
            
            {/* Пример поля ввода */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm text-gray-400">Имя профиля</label>
              <input 
                type="text" 
                placeholder="Введи название..."
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">
              Сохранить профиль
            </button>
          </div>
        </div>
      </main>

    </div>

'use client';

// 1. Импортируем наш новый компонент загрузки
import FileUploader from '@/components/FileUploader';

export default function Dashboard() {
  return (
    <div className="flex h-screen p-4 gap-4">
      {/* Боковое меню Async */}
      <aside className="glass-panel w-64 rounded-3xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          ASYNC
        </h1>
      </aside>

      {/* Основная рабочая область */}
      <main className="flex-1 flex flex-col gap-4">
        <header className="glass-panel h-20 rounded-3xl flex items-center px-8">
          <h2 className="text-xl font-medium">Конфигурация проекта</h2>
        </header>

        {/* Область контента */}
        <div className="glass-panel flex-1 rounded-3xl p-8 overflow-y-auto">
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium mb-6">Загрузка файлов</h3>
            
            {/* 2. Просто вставляем компонент сюда */}
            <FileUploader />
            
          </div>
        </div>
      </main>
    </div>
  );
}