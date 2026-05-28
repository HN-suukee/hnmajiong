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

  // 获取麻将牌图片的URL
  const getTileImageUrl = () => {
    if (tile.suit === 'wan') {
      return `/images/mahjong/wan-${tile.value}.png`;
    } else if (tile.suit === 'tong') {
      return `/images/mahjong/tong-${tile.value}.png`;
    } else if (tile.suit === 'tiao') {
      return `/images/mahjong/tiao-${tile.value}.png`;
    }
    return null;
  };

  const imageUrl = getTileImageUrl();

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

  // 如果有图片则显示图片，否则显示文字
  if (imageUrl) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'rounded-lg shadow-md border-2 transition-all duration-150 cursor-pointer overflow-hidden',
          'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300',
          selected ? 'ring-4 ring-yellow-400 transform -translate-y-2 shadow-lg' : 'hover:transform hover:-translate-y-1',
          sizeClasses[size],
          onClick && 'hover:shadow-lg'
        )}
      >
        <img
          src={imageUrl}
          alt={`${tile.suit} ${tile.value}`}
          className='w-full h-full object-cover'
        />
      </div>
    );
  }

  // 字牌使用Emoji显示
  const getHonorTileContent = () => {
    const honorTiles: Record<string, string> = {
      'dong': '🀀',
      'nan': '🀁',
      'xi': '🀂',
      'bei': '🀃',
      'bai': '🀆',
      'fa': '🀅',
      'zhong': '🀄',
    };
    return honorTiles[tile.suit] || '?';
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
        <div className='text-2xl'>{getHonorTileContent()}</div>
      </div>
    </div>
  );
}
