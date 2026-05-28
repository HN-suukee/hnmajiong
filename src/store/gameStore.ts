
import { create } from 'zustand';
import { GameState, Action, Tile } from '../types/mahjong';
import {
  initGame, drawTile, nextPlayer, performAction, getPossibleActions,
  canHu
} from '../utils/mahjongLogic';
import { aiSelectDiscard, aiSelectAction } from '../utils/aiPlayer';

interface GameStore {
  gameState: GameState;
  selectedTile: Tile | null;
  isProcessing: boolean;
  
  startGame: () =&gt; void;
  selectTile: (tile: Tile | null) =&gt; void;
  discardTile: (tile: Tile) =&gt; void;
  performPlayerAction: (action: Action) =&gt; void;
  processAITurn: () =&gt; void;
}

export const useGameStore = create&lt;GameStore&gt;((set, get) =&gt; ({
  gameState: initGame(),
  selectedTile: null,
  isProcessing: false,
  
  startGame: () =&gt; {
    set({
      gameState: initGame(),
      selectedTile: null,
      isProcessing: false
    });
  },
  
  selectTile: (tile: Tile | null) =&gt; {
    set({ selectedTile: tile });
  },
  
  discardTile: (tile: Tile) =&gt; {
    const { gameState } = get();
    const player = gameState.players[gameState.currentPlayer];
    
    if (!player.isHuman) return;
    
    const newState = performAction(gameState, { type: 'discard', tile }, gameState.currentPlayer);
    newState.currentPlayer = nextPlayer(newState.currentPlayer);
    
    set({ gameState: newState, selectedTile: null, isProcessing: true });
    
    setTimeout(() =&gt; {
      get().processAITurn();
    }, 800);
  },
  
  performPlayerAction: (action: Action) =&gt; {
    const { gameState } = get();
    
    if (action.type === 'hu') {
      set({
        gameState: {
          ...gameState,
          isOver: true,
          winner: 0
        },
        isProcessing: false
      });
      return;
    }
    
    if (action.type === 'pass') {
      const newState = { ...gameState, waitingForAction: false };
      newState.currentPlayer = nextPlayer(newState.currentPlayer);
      
      set({ gameState: newState, isProcessing: true });
      setTimeout(() =&gt; {
        get().processAITurn();
      }, 500);
      return;
    }
    
    if (action.type === 'peng') {
      const newState = performAction(gameState, action, 0);
      newState.waitingForAction = false;
      newState.currentPlayer = 0;
      set({ gameState: newState });
      return;
    }
  },
  
  processAITurn: () =&gt; {
    const { gameState } = get();
    
    if (gameState.isOver) {
      set({ isProcessing: false });
      return;
    }
    
    let current = gameState.currentPlayer;
    let state = { ...gameState };
    
    while (!state.players[current].isHuman &amp;&amp; !state.isOver) {
      if (state.wall.length &gt; 0) {
        state = drawTile(state);
      } else {
        state.isOver = true;
        set({ gameState: state, isProcessing: false });
        return;
      }
      
      if (canHu(state.players[current].hand)) {
        state.isOver = true;
        state.winner = current;
        set({ gameState: state, isProcessing: false });
        return;
      }
      
      const tileToDiscard = aiSelectDiscard(state.players[current], state);
      state = performAction(state, { type: 'discard', tile: tileToDiscard }, current);
      current = nextPlayer(current);
      state.currentPlayer = current;
      
      if (state.players[0].isHuman) {
        const actions = getPossibleActions(state, 0, state.lastDiscard);
        if (actions.length &gt; 0) {
          state.waitingForAction = true;
          state.possibleActions = actions;
          set({ gameState: state, isProcessing: false });
          return;
        }
      }
      
      set({ gameState: state });
    }
    
    if (state.players[current].isHuman &amp;&amp; state.wall.length &gt; 0) {
      state = drawTile(state);
      set({ gameState: state, isProcessing: false });
    } else {
      set({ gameState: state, isProcessing: false });
    }
  }
}));
