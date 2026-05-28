import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8'>
          <Link
            to='/'
            className='inline-flex items-center text-white hover:text-yellow-400 transition-colors'
          >
            <span className='mr-2'>←</span>
            返回游戏
          </Link>
        </div>
        
        <h1 className='text-4xl font-bold text-yellow-400 mb-8 text-center'>
          ⚙️ 游戏设置 ⚙️
        </h1>
        
        <div className='space-y-6'>
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>AI 难度</h2>
            <div className='grid grid-cols-3 gap-4'>
              <button
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  difficulty === 'easy'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDifficulty('easy')}
              >
                简单
              </button>
              <button
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  difficulty === 'medium'
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDifficulty('medium')}
              >
                中等
              </button>
              <button
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  difficulty === 'hard'
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDifficulty('hard')}
              >
                困难
              </button>
            </div>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>声音设置</h2>
            <div className='flex items-center justify-between'>
              <span className='text-gray-700 font-medium'>游戏音效</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-16 h-8 rounded-full transition-colors relative ${
                  soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    soundEnabled ? 'left-9' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>动画效果</h2>
            <div className='flex items-center justify-between'>
              <span className='text-gray-700 font-medium'>启用动画</span>
              <button
                onClick={() => setAnimationEnabled(!animationEnabled)}
                className={`w-16 h-8 rounded-full transition-colors relative ${
                  animationEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    animationEnabled ? 'left-9' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>关于游戏</h2>
            <div className='text-gray-700 space-y-2'>
              <p><strong>海南麻将 v1.0</strong></p>
              <p>一款经典的海南麻将休闲游戏</p>
              <p>与AI对战，锻炼你的麻将技巧！</p>
            </div>
          </div>
        </div>
        
        <div className='mt-8 text-center'>
          <Link
            to='/'
            className='inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all'
          >
            返回游戏
          </Link>
        </div>
      </div>
    </div>
  );
}
