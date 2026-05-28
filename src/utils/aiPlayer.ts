import { Tile, GameState, Player, Action } from '../types/mahjong';
import { tilesEqual, canHu } from './mahjongLogic';

export function aiSelectDiscard(player: Player, gameState: GameState): Tile {
  const hand = [...player.hand];
  
  for (const tile of hand) {
    const newHand = hand.filter(t => t.id !== tile.id);
    if (canHu(newHand)) {
      return tile;
    }
  }
  
  const tileScores = hand.map(tile => {
    const score = evaluateTile(tile, hand, gameState);
    return { tile, score };
  });
  
  tileScores.sort((a, b) => a.score - b.score);
  return tileScores[0].tile;
}

function evaluateTile(tile: Tile, hand: Tile[], gameState: GameState): number {
  let score = 0;
  
  const sameCount = hand.filter(t => tilesEqual(t, tile)).length;
  if (sameCount === 1) score -= 2;
  if (sameCount === 2) score += 5;
  if (sameCount >= 3) score += 10;
  
  if (['wan', 'tong', 'tiao'].includes(tile.suit)) {
    const hasPrev = hand.some(t => t.suit === tile.suit && t.value === tile.value - 1);
    const hasNext = hand.some(t => t.suit === tile.suit && t.value === tile.value + 1);
    const hasPrev2 = hand.some(t => t.suit === tile.suit && t.value === tile.value - 2);
    const hasNext2 = hand.some(t => t.suit === tile.suit && t.value === tile.value + 2);
    
    if (hasPrev) score += 3;
    if (hasNext) score += 3;
    if (hasPrev2 && !hasPrev) score += 1;
    if (hasNext2 && !hasNext) score += 1;
    
    if (tile.value === 1 || tile.value === 9) score -= 1;
  }
  
  if (['dong', 'nan', 'xi', 'bei', 'bai', 'fa', 'zhong'].includes(tile.suit)) {
    if (sameCount === 1) score -= 5;
  }
  
  return score;
}

export function aiSelectAction(actions: Action[], player: Player, gameState: GameState): Action {
  const huAction = actions.find(a => a.type === 'hu');
  if (huAction) return huAction;
  
  const gangAction = actions.find(a => a.type === 'gang');
  if (gangAction) return gangAction;
  
  const pengAction = actions.find(a => a.type === 'peng');
  if (pengAction) return pengAction;
  
  const chiAction = actions.find(a => a.type === 'chi');
  if (chiAction && Math.random() > 0.3) return chiAction;
  
  const passAction = actions.find(a => a.type === 'pass');
  if (passAction) return passAction;
  
  return actions[0];
}
