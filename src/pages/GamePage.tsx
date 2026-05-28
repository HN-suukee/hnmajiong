import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MahjongTile from '../components/MahjongTile';
import { useGameStore } from '../store/gameStore';
import { Tile } from '../types/mahjong';

export default function GamePage() {
  const {
    gameState,
    selectedTile,
    isProcessing,
    startGame,
    selectTile,
    discardTile,
    performPlayerAction
  } = useGameStore();
  
  const [gameStarted, setGameStarted] = useState(false);
  
  const handleStartGame = () => {
    setGameStarted(true);
    startGame();
  };
  
  const handleTileClick = (tile: Tile) => {
    if (isProcessing || gameState.isOver) return;
    
    if (selectedTile?.id === tile.id) {
      discardTile(tile);
    } else {
      selectTile(tile);
    }
  };
  
  const renderPlayerArea = (index: number) => {
    const player = gameState.players[index];
    const isCurrentPlayer = gameState.currentPlayer === index;
    
    if (index === 0) {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-white font-bold text-lg">
            {player.name} {isCurrentPlayer && '🎯'}
          </div>
          <div className="flex gap-1 flex-wrap justify-center">
            {player.hand.map((tile) => (
              <MahjongTile
                key={tile.id}
                tile={tile}
                selected={selectedTile?.id === tile.id}
                onClick={() => handleTileClick(tile)}
                size="lg"
              />
            ))}
          </div>
          {selectedTile && (
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
              onClick={() => discardTile(selectedTile)}
            >
              打出这张牌
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-white font-bold">
          {player.name} {isCurrentPlayer && '🎯'}
        </div>
        <div className="flex gap-0.5">
          {player.hand.map((_, i) => (
            <div
              key={i}
              className="w-8 h-12 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-800"
            />
          ))}
        </div>
      </div>
    );
  };
  
  const renderActionButtons = () => {
    if (!gameState.waitingForAction) return null;
    
    return (
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {gameState.possibleActions.map((action, index) => (
          <button
            key={index}
            className={
              "font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 " +
              (action.type === 'hu' ? 'bg-red-600 hover:bg-red-700 text-white' :
               action.type === 'gang' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
               action.type === 'peng' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
               action.type === 'chi' ? 'bg-green-600 hover:bg-green-700 text-white' :
               'bg-gray-600 hover:bg-gray-700 text-white')
            }
            onClick={() => performPlayerAction(action)}
          >
            {action.type === 'hu' && '胡'}
            {action.type === 'gang' && '杠'}
            {action.type === 'peng' && '碰'}
            {action.type === 'chi' && '吃'}
            {action.type === 'pass' && '过'}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <Link
          to="/rules"
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
        >
          查看规则
        </Link>
        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          🀄 海南麻将 🀄
        </h1>
        <Link
          to="/settings"
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
        >
          设置
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-8">🎴🀄🎴</div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-8">海南麻将</h2>
            <button
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-12 rounded-xl shadow-2xl text-2xl transform hover:scale-105 transition-all"
              onClick={handleStartGame}
            >
              开始游戏
            </button>
          </div>
        ) : (
          <div className="w-full max-w-5xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl shadow-2xl"></div>
              
              <div className="relative p-8 min-h-[500px]">
                <div className="flex justify-center mb-4">
                  {renderPlayerArea(2)}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  {renderPlayerArea(1)}
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-2">
                      剩余牌: {gameState.wall.length}
                    </div>
                    {gameState.lastDiscard && (
                      <div className="flex justify-center">
                        <MahjongTile tile={gameState.lastDiscard} size="md" />
                      </div>
                    )}
                  </div>
                  {renderPlayerArea(3)}
                </div>
                
                <div className="flex justify-center">
                  {renderPlayerArea(0)}
                </div>
                
                {renderActionButtons()}
              </div>
              
              {gameState.isOver && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 rounded-3xl">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
                    <div className="text-6xl mb-4">
                      {gameState.winner === 0 ? '🎉' : '😢'}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      {gameState.winner === 0 ? '恭喜你赢了！' : `${gameState.players[gameState.winner!].name}赢了`}
                    </h2>
                    <button
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                      onClick={() => {
                        startGame();
                      }}
                    >
                      再来一局
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
