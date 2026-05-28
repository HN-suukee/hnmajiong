
## 1. Architecture Design
```mermaid
graph TD
    A[Frontend React App] --> B[Game State Management]
    B --> C[Mahjong Logic Engine]
    B --> D[AI Player Module]
    A --> E[UI Components]
    E --> F[Game Table]
    E --> G[Hand Display]
    E --> H[Action Buttons]
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None (纯前端项目)
- Database: None

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 游戏主页面 |
| /rules | 规则说明页面 |
| /settings | 设置页面 |

## 4. API Definitions (if backend exists)
本项目不涉及后端API

## 5. Server Architecture Diagram (if backend exists)
本项目不涉及后端服务器

## 6. Data Model (if applicable)

### 6.1 Data Model Definition

```mermaid
erDiagram
    TILE {
        string suit
        int value
    }
    PLAYER {
        string name
        boolean isHuman
        TILE[] hand
        TILE[] melds
    }
    GAME {
        PLAYER[] players
        TILE[] wall
        TILE[] discardPile
        int currentPlayer
        int dealer
        boolean isOver
    }
```

### 6.2 Data Definition Language
本项目不涉及数据库
