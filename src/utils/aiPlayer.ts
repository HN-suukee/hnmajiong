
import { Tile, GameState, Player, Action } from '../types/mahjong';
import { tilesEqual, canHu, canPeng, canGang, canChi, getPossibleActions, sortHand } from './mahjongLogic';

// AI选择出牌策略
export function aiSelectDiscard(player: Player, gameState: GameState): Tile {
  const hand = [...player.hand];
  
  for (const tile of hand) {
    const newHand = hand.filter(t =&gt; t.id !== tile.id);
    if (canHu(newHand)) {
      return tile;
    }
  }
  
  const tileScores = hand.map(tile =&gt; {
    const score = evaluateTile(tile, hand, gameState);
    return { tile, score };
  });
  
  tileScores.sort((a, b) =&gt; a.score - b.score);
  return tileScores[0].tile;
}

// 评估一张牌的价值（分数越低越应该被打出去）
function evaluateTile(tile: Tile, hand: Tile[], gameState: GameState): number {
  let score = 0;
  
  const sameCount = hand.filter(t =&gt; tilesEqual(t, tile)).length;
  if (sameCount === 1) score -= 2;
  if (sameCount === 2) score += 5;
  if (sameCount &gt;= 3) score += 10;
  
  if (['wan', 'tong', 'tiao'].includes(tile.suit)) {
    const hasPrev = hand.some(t =&gt; t.suit === tile.suit &amp;&amp; t.value === tile.value - 1);
    const hasNext = hand.some(t =&gt; t.suit === tile.suit &amp;&amp; t.value === tile.value + 1);
    const hasPrev2 = hand.some(t =&gt; t.suit === tile.suit &amp;&amp; t.value === tile.value - 2);
    const hasNext2 = hand.some(t =&gt; t.suit === tile.suit &amp;&amp; t.value === tile.value + 2);
    
    if (hasPrev) score += 3;
    if (hasNext) score += 3;
    if (hasPrev2 &amp;&amp; !hasPrev) score += 1;
    if (hasNext2 &amp;&amp; !hasNext) score += 1;
    
    if (tile.value === 1 || tile.value === 9) score -= 1;
  }
  
  if (['dong', 'nan', 'xi', 'bei', 'bai', 'fa', 'zhong'].includes(tile.suit)) {
    if (sameCount === 1) score -= 5;
  }
  
  return score;
}

// AI选择动作
export function aiSelectAction(actions: Action[], player: Player, gameState: GameState): Action {
  const huAction = actions.find(a =&gt; a.type === 'hu');
  if (huAction) return huAction;
  
  const gangAction = actions.find(a =&gt; a.type === 'gang');
  if (gangAction) return gangAction;
  
  const pengAction = actions.find(a =&gt; a.type === 'peng');
  if (pengAction) return pengAction;
  
  const chiAction = actions.find(a =&gt; a.type === 'chi');
  if (chiAction &amp;&amp; Math.random() &gt; 0.3) return chiAction;
  
  const passAction = actions.find(a =&gt; a.type === 'pass');
  if (passAction) return passAction;
  
  return actions[0];
}
