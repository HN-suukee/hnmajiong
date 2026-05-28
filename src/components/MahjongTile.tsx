import React from 'react';
import { Tile } from '../types/mahjong';
import { cn } from '../lib/utils';

interface MahjongTileProps {
  tile: Tile;
  selected?: boolean;
  onClick?: () => void;
  hidden?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function MahjongTile({ tile, selected, onClick, hidden, size = 'md' }: MahjongTileProps) {
  const sizeClasses = {
    sm: 'w-8 h-11 text-xs',
    md: 'w-12 h-16 text-sm',
    lg: 'w-16 h-22 text-base'
  };
  
  if (hidden) {
    return (
      <div className={cn(
        'rounded-lg shadow-md border-2 border-amber-800',
        'bg-gradient-to-br from-amber-700 to-amber-900',
        sizeClasses[size]
      )}>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-3/4 h-3/4 border-2 border-amber-600 rounded'></div>
        </div>
      </div>
    );
  }
  
  const getTileContent = () => {
    switch (tile.suit) {
      case 'wan':
        return (
          <div className='text-red-800 font-bold'>
            <div className='text-lg'>{tile.value}</div>
            <div className='text-xs'>万</div>
          </div>
        );
      case 'tong':
        return (
          <div className='flex flex-col items-center'>
            {Array.from({ length: tile.value }).map((_, i) => (
              <div key={i} className='w-3 h-3 rounded-full bg-blue-600 mb-0.5'></div>
            ))}
          </div>
        );
      case 'tiao':
        return (
          <div className='flex flex-col items-center'>
            {tile.value === 1 ? (
              <div className='text-green-700 text-xl'>🀇</div>
            ) : (
              <div className='text-green-800 font-bold'>
                {tile.value}条
              </div>
            )}
          </div>
        );
      case 'dong':
        return <div className='text-2xl'>🀀</div>;
      case 'nan':
        return <div className='text-2xl'>🀁</div>;
      case 'xi':
        return <div className='text-2xl'>🀂</div>;
      case 'bei':
        return <div className='text-2xl'>🀃</div>;
      case 'bai':
        return <div className='text-2xl'>🀆</div>;
      case 'fa':
        return <div className='text-2xl text-green-700'>🀅</div>;
      case 'zhong':
        return <div className='text-2xl text-red-700'>🀄</div>;
      default:
        return null;
    }
  };
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg shadow-md border-2 transition-all duration-150 cursor-pointer',
        'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300',
        selected ? 'ring-4 ring-yellow-400 transform -translate-y-2 shadow-lg' : 'hover:transform hover:-translate-y-1',
        sizeClasses[size],
        onClick && 'hover:shadow-lg'
      )}
    >
      <div className='w-full h-full flex items-center justify-center'>
        {getTileContent()}
      </div>
    </div>
  );
}
