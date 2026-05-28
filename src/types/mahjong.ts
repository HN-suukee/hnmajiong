
export type Suit = 'wan' | 'tong' | 'tiao' | 'dong' | 'nan' | 'xi' | 'bei' | 'bai' | 'fa' | 'zhong';

export interface Tile {
  suit: Suit;
  value: number;
  id: string;
}

export interface Meld {
  tiles: Tile[];
  type: 'chi' | 'peng' | 'gang' | 'angang';
  fromPlayer: number;
}

export interface Player {
  name: string;
  isHuman: boolean;
  hand: Tile[];
  melds: Meld[];
  discarded: Tile[];
  isDealer: boolean;
  score: number;
}

export interface GameState {
  players: Player[];
  wall: Tile[];
  discardPile: Tile[];
  currentPlayer: number;
  dealer: number;
  isOver: boolean;
  winner?: number;
  lastDiscard?: Tile;
  waitingForAction: boolean;
  possibleActions: Action[];
}

export type ActionType = 'chi' | 'peng' | 'gang' | 'hu' | 'pass' | 'draw' | 'discard';

export interface Action {
  type: ActionType;
  tile?: Tile;
  tiles?: Tile[];
  targetPlayer?: number;
}

export interface ChiOption {
  tiles: [Tile, Tile];
  with: Tile;
}

