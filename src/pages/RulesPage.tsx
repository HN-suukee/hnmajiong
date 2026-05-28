import React from 'react';
import { Link } from 'react-router-dom';

export default function RulesPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-8'>
      <div className='max-w-3xl mx-auto'>
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
          🀄 海南麻将规则 🀄
        </h1>
        
        <div className='space-y-6'>
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>基本介绍</h2>
            <p className='text-gray-700 mb-2'>
              海南麻将是一种流行于中国海南地区的麻将玩法，使用144张牌，包括万、筒、条、字牌各4张。
            </p>
            <p className='text-gray-700'>
              游戏由4人参与，目标是通过组合手牌形成符合规则的牌型，优先胡牌获胜。
            </p>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>基本牌型</h2>
            <ul className='space-y-2 text-gray-700'>
              <li><strong>顺子：</strong> 同花色3张连续数字的牌，如1-2-3万</li>
              <li><strong>刻子：</strong> 3张相同的牌，如3个东风</li>
              <li><strong>杠：</strong> 4张相同的牌，分明杠、暗杠和加杠</li>
              <li><strong>对子：</strong> 2张相同的牌</li>
            </ul>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>胡牌条件</h2>
            <p className='text-gray-700 mb-4'>
              基本胡牌牌型为：4组面子（顺子或刻子或杠）+ 1个对子
            </p>
            <div className='bg-emerald-50 rounded-xl p-4'>
              <p className='text-emerald-800 font-semibold'>
                示例：顺子 + 刻子 + 顺子 + 刻子 + 对子 = 胡牌
              </p>
            </div>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>游戏操作</h2>
            <ul className='space-y-2 text-gray-700'>
              <li><strong>吃：</strong> 用手中两张牌吃上家打出的一张牌组成顺子（仅对家）</li>
              <li><strong>碰：</strong> 用手中两张相同牌碰任何人打出的一张相同牌组成刻子</li>
              <li><strong>杠：</strong> 4张相同牌，可明杠或暗杠</li>
              <li><strong>胡：</strong> 当手牌符合胡牌条件时，可以胡牌获胜</li>
            </ul>
          </div>
          
          <div className='bg-white/95 rounded-2xl p-6 shadow-xl'>
            <h2 className='text-xl font-bold text-emerald-800 mb-4'>游戏流程</h2>
            <ol className='list-decimal list-inside space-y-2 text-gray-700'>
              <li>庄家开始先抓14张牌，其他玩家抓13张牌</li>
              <li>从庄家开始轮流出牌</li>
              <li>其他玩家可以进行吃、碰、杠、胡等操作</li>
              <li>无人操作则下一位玩家抓牌并打牌</li>
              <li>有人胡牌或牌抓完则游戏结束</li>
            </ol>
          </div>
        </div>
        
        <div className='mt-8 text-center'>
          <Link
            to='/'
            className='inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all'
          >
            开始游戏
          </Link>
        </div>
      </div>
    </div>
  );
}
