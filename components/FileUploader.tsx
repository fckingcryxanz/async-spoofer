'use client';

import { useState } from 'react';

export default function FileUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-[#0c0c14]/50 border border-white/5 rounded-xl p-5 space-y-4">
      <div className="border-b border-white/5 pb-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asset Uploader</span>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer relative ${
          dragActive 
            ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_20px_rgba(147,51,234,0.1)]' 
            : 'border-white/10 hover:border-white/20 bg-[#06060a]/50'
        }`}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[0px]" 
          onChange={handleChange}
        />
        
        <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-gray-200">
            {file ? file.name : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500">
            {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Supports .fbx, .obj, .png, .mp3, .rbxm (Bypasses 25MB limit)'}
          </p>
        </div>
      </div>
    </div>
  );
}