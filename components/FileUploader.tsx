'use client';

import { useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function FileUploader() {
  const [progress, setProgress] = useState<number>(0);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Создаем уникальный путь для файла в хранилище
    const storageRef = ref(storage, `assets/${Date.now()}_${file.name}`);
    
    // Запускаем прямую загрузку
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Вычисляем процент загрузки для прогресс-бара
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percentage));
      },
      (error) => {
        console.error('Ошибка при загрузке:', error);
        setIsUploading(false);
      },
      async () => {
        // Успешное завершение — получаем прямую ссылку на файл
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFileUrl(downloadURL);
        setIsUploading(false);
        console.log('Файл успешно загружен! Ссылка:', downloadURL);
      }
    );
  };

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Загрузка крупных ассетов (без ограничений)
      </label>
      
      <input 
        type="file" 
        onChange={handleUpload}
        disabled={isUploading}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 file:cursor-pointer cursor-pointer"
      />

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-purple-400 mt-2">Загружено: {progress}%</p>
        </div>
      )}

      {fileUrl && (
        <p className="text-xs text-green-400 mt-3 truncate">
          Готово! URL: <a href={fileUrl} target="_blank" rel="noreferrer" className="underline">{fileUrl}</a>
        </p>
      )}
    </div>
  );
}