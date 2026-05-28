import { Tile, Suit, Player, GameState, Action, Meld, ChiOption } from '../types/mahjong';

export function generateAllTiles(): Tile[] {
  const tiles: Tile[] = [];
  const suits: Suit[] = ['wan', 'tong', 'tiao'];
  
  suits.forEach(suit => {
    for (let value = 1; value <= 9; value++) {
      for (let i = 0; i < 4; i++) {
        tiles.push({
          suit, value, id: `${suit}-${value}-${i}`
        });
      }
    }
  });
  
  const honorSuits: Suit[] = ['dong', 'nan', 'xi', 'bei', 'bai', 'fa', 'zhong'];
  honorSuits.forEach(suit => {
    for (let i = 0; i < 4; i++) {
      tiles.push({ suit, value: 1, id: `${suit}-1-${i}` });
    }
  });
  
  return tiles;
}

export function shuffleTiles(tiles: Tile[]): Tile[] {
  const shuffled = [...tiles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function tilesEqual(t1: Tile, t2: Tile): boolean {
  return t1.suit === t2.suit && t1.value === t2.value;
}

export function sortHand(hand: Tile[]): Tile[] {
  const suitOrder: Record<Suit, number> = {
    'wan': 0, 'tong': 1, 'tiao': 2,
    'dong': 3, 'nan': 4, 'xi': 5, 'bei': 6,
    'bai': 7, 'fa': 8, 'zhong': 9
  };
  
  return [...hand].sort((a, b) => {
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return a.value - b.value;
  });
}

export function initGame(): GameState {
  const allTiles = shuffleTiles(generateAllTiles());
  const wall = [...allTiles];
  
  const players: Player[] = [
    { name: '你', isHuman: true, hand: [], melds: [], discarded: [], isDealer: true, score: 0 },
    { name: '东家', isHuman: false, hand: [], melds: [], discarded: [], isDealer: false, score: 0 },
    { name: '南家', isHuman: false, hand: [], melds: [], discarded: [], isDealer: false, score: 0 },
    { name: '北家', isHuman: false, hand: [], melds: [], discarded: [], isDealer: false, score: 0 }
  ];
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      players[i].hand.push(wall.pop()!);
    }
    players[i].hand = sortHand(players[i].hand);
  }
  
  players[0].hand.push(wall.pop()!);
  players[0].hand = sortHand(players[0].hand);
  
  return {
    players,
    wall,
    discardPile: [],
    currentPlayer: 0,
    dealer: 0,
    isOver: false,
    waitingForAction: false,
    possibleActions: []
  };
}

export function canPeng(player: Player, tile: Tile): boolean {
  let count = 0;
  for (const t of player.hand) {
    if (tilesEqual(t, tile)) {
      count++;
    }
  }
  return count >= 2;
}

export function canGang(player: Player, tile: Tile): boolean {
  let count = 0;
  for (const t of player.hand) {
    if (tilesEqual(t, tile)) {
      count++;
    }
  }
  return count >= 3;
}

export function canAnGang(player: Player): Tile[] {
  const possible: Tile[] = [];
  const tileCounts: Record<string, Tile[]> = {};
  
  player.hand.forEach(tile => {
    const key = `${tile.suit}-${tile.value}`;
    if (!tileCounts[key]) tileCounts[key] = [];
    tileCounts[key].push(tile);
  });
  
  Object.values(tileCounts).forEach(tiles => {
    if (tiles.length >= 4) {
      possible.push(tiles[0]);
    }
  });
  
  return possible;
}

export function canChi(player: Player, tile: Tile): ChiOption[] {
  if (!['wan', 'tong', 'tiao'].includes(tile.suit)) return [];
  
  const options: ChiOption[] = [];
  const handCopy = [...player.hand];
  
  for (let i = 0; i < handCopy.length; i++) {
    for (let j = i + 1; j < handCopy.length; j++) {
      const t1 = handCopy[i];
      const t2 = handCopy[j];
      
      if (t1.suit !== tile.suit || t2.suit !== tile.suit) continue;
      
      const values = [t1.value, t2.value, tile.value].sort((a, b) => a - b);
      if (values[1] - values[0] === 1 && values[2] - values[1] === 1) {
        options.push({
          tiles: [t1, t2],
          with: tile
        });
      }
    }
  }
  
  return options;
}

export function canHu(hand: Tile[], tile?: Tile): boolean {
  const testHand = tile ? [...hand, tile] : [...hand];
  const sorted = sortHand(testHand);
  
  const tileCounts: Record<string, Tile[]> = {};
  sorted.forEach(t => {
    const key = `${t.suit}-${t.value}`;
    if (!tileCounts[key]) tileCounts[key] = [];
    tileCounts[key].push(t);
  });
  
  const pairs: Tile[][] = [];
  Object.values(tileCounts).forEach(tiles => {
    if (tiles.length >= 2) {
      pairs.push(tiles.slice(0, 2));
    }
  });
  
  for (const pair of pairs) {
    const remaining = sorted.filter(t => !pair.includes(t));
    if (canFormMelds(remaining)) {
      return true;
    }
  }
  
  return false;
}

function canFormMelds(tiles: Tile[]): boolean {
  if (tiles.length === 0) return true;
  
  const sorted = sortHand(tiles);
  
  const first = sorted[0];
  const tripletMatch = sorted.filter(t => tilesEqual(t, first));
  if (tripletMatch.length >= 3) {
    const newTiles = [...sorted];
    newTiles.splice(newTiles.findIndex(t => t === tripletMatch[0]), 1);
    newTiles.splice(newTiles.findIndex(t => t === tripletMatch[1]), 1);
    newTiles.splice(newTiles.findIndex(t => t === tripletMatch[2]), 1);
    if (canFormMelds(newTiles)) return true;
  }
  
  if (['wan', 'tong', 'tiao'].includes(first.suit)) {
    const next1 = sorted.find(t => t.suit === first.suit && t.value === first.value + 1);
    const next2 = sorted.find(t => t.suit === first.suit && t.value === first.value + 2);
    if (next1 && next2) {
      const newTiles = [...sorted];
      newTiles.splice(newTiles.findIndex(t => t === first), 1);
      newTiles.splice(newTiles.findIndex(t => t === next1), 1);
      newTiles.splice(newTiles.findIndex(t => t === next2), 1);
      if (canFormMelds(newTiles)) return true;
    }
  }
  
  return false;
}

export function getPossibleActions(gameState: GameState, playerIndex: number, discardTile?: Tile): Action[] {
  const actions: Action[] = [];
  const player = gameState.players[playerIndex];
  
  if (discardTile) {
    if (canHu(player.hand, discardTile)) {
      actions.push({ type: 'hu', tile: discardTile });
    }
    if (canGang(player, discardTile)) {
      actions.push({ type: 'gang', tile: discardTile });
    }
    if (canPeng(player, discardTile)) {
      actions.push({ type: 'peng', tile: discardTile });
    }
    if (playerIndex === (gameState.currentPlayer + 1) % 4 && canChi(player, discardTile).length > 0) {
      actions.push({ type: 'chi', tile: discardTile });
    }
    if (actions.length > 0) {
      actions.push({ type: 'pass' });
    }
  } else {
    const anGangTiles = canAnGang(player);
    if (anGangTiles.length > 0) {
      anGangTiles.forEach(tile => {
        actions.push({ type: 'gang', tile });
      });
    }
    if (canHu(player.hand)) {
      actions.push({ type: 'hu' });
    }
  }
  
  return actions;
}

export function performAction(gameState: GameState, action: Action, playerIndex: number): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  const player = newState.players[playerIndex];
  
  switch (action.type) {
    case 'discard':
      if (action.tile) {
        const tileIndex = player.hand.findIndex(t => t.id === action.tile!.id);
        if (tileIndex !== -1) {
          const discarded = player.hand.splice(tileIndex, 1)[0];
          newState.discardPile.push(discarded);
          newState.lastDiscard = discarded;
        }
      }
      break;
    
    case 'peng':
      if (action.tile) {
        const tileToRemove = player.hand.filter(t => tilesEqual(t, action.tile!));
        const meld: Meld = {
          tiles: [action.tile!, ...tileToRemove.slice(0, 2)],
          type: 'peng',
          fromPlayer: newState.currentPlayer
        };
        player.melds.push(meld);
        
        tileToRemove.slice(0, 2).forEach(t => {
          const idx = player.hand.findIndex(ht => ht.id === t.id);
          if (idx !== -1) player.hand.splice(idx, 1);
        });
      }
      break;
  }
  
  return newState;
}

export function nextPlayer(current: number): number {
  return (current + 1) % 4;
}

export function drawTile(gameState: GameState): GameState {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  if (newState.wall.length > 0) {
    const tile = newState.wall.pop()!;
    newState.players[newState.currentPlayer].hand.push(tile);
    newState.players[newState.currentPlayer].hand = sortHand(newState.players[newState.currentPlayer].hand);
  }
  return newState;
}
