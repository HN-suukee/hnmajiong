
import React from 'react';
import { Tile } from '../types/mahjong';
import { cn } from '../lib/utils';

interface MahjongTileProps {
  tile: Tile;
  selected?: boolean;
  onClick?: () =&gt; void;
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
      &lt;div className={cn(
        'rounded-lg shadow-md border-2 border-amber-800',
        'bg-gradient-to-br from-amber-700 to-amber-900',
        sizeClasses[size]
      )}&gt;
        &lt;div className='w-full h-full flex items-center justify-center'&gt;
          &lt;div className='w-3/4 h-3/4 border-2 border-amber-600 rounded'&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
  
  const getTileContent = () =&gt; {
    switch (tile.suit) {
      case 'wan':
        return (
          &lt;div className='text-red-800 font-bold'&gt;
            &lt;div className='text-lg'&gt;{tile.value}&lt;/div&gt;
            &lt;div className='text-xs'&gt;万&lt;/div&gt;
          &lt;/div&gt;
        );
      case 'tong':
        return (
          &lt;div className='flex flex-col items-center'&gt;
            {[...Array(tile.value)].map((_, i) =&gt; (
              &lt;div key={i} className='w-3 h-3 rounded-full bg-blue-600 mb-0.5'&gt;&lt;/div&gt;
            ))}
          &lt;/div&gt;
        );
      case 'tiao':
        return (
          &lt;div className='flex flex-col items-center'&gt;
            {tile.value === 1 ? (
              &lt;div className='text-green-700 text-xl'&gt;🀇&lt;/div&gt;
            ) : (
              &lt;div className='text-green-800 font-bold'&gt;
                {tile.value}条
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        );
      case 'dong':
        return &lt;div className='text-2xl'&gt;🀀&lt;/div&gt;;
      case 'nan':
        return &lt;div className='text-2xl'&gt;🀁&lt;/div&gt;;
      case 'xi':
        return &lt;div className='text-2xl'&gt;🀂&lt;/div&gt;;
      case 'bei':
        return &lt;div className='text-2xl'&gt;🀃&lt;/div&gt;;
      case 'bai':
        return &lt;div className='text-2xl'&gt;🀆&lt;/div&gt;;
      case 'fa':
        return &lt;div className='text-2xl text-green-700'&gt;🀅&lt;/div&gt;;
      case 'zhong':
        return &lt;div className='text-2xl text-red-700'&gt;🀄&lt;/div&gt;;
      default:
        return null;
    }
  };
  
  return (
    &lt;div
      onClick={onClick}
      className={cn(
        'rounded-lg shadow-md border-2 transition-all duration-150 cursor-pointer',
        'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300',
        selected ? 'ring-4 ring-yellow-400 transform -translate-y-2 shadow-lg' : 'hover:transform hover:-translate-y-1',
        sizeClasses[size],
        onClick &amp;&amp; 'hover:shadow-lg'
      )}
    &gt;
      &lt;div className='w-full h-full flex items-center justify-center'&gt;
        {getTileContent()}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
