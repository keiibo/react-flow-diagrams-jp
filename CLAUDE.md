# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **generic flow diagram library** being developed as an open-source alternative to React Flow. The main goals are:
- Create a MIT-licensed flow diagram library without licensing constraints
- Build a generic, reusable library (not character-specific)
- Maintain essential React Flow compatibility for easy migration
- Improve performance and customization capabilities
- Focus on core flow diagram functionality

## Architecture

The library follows a modular design with these core components:

### Core Structure
```
src/
├── core/              # Core functionality
│   ├── Canvas         # Main canvas component
│   ├── Viewport       # Zoom/pan viewport controls
│   ├── Selection      # Selection state management
│   └── Connection     # Connection management
├── components/        # UI components
│   ├── Node           # Generic node components
│   ├── Edge           # Generic edge components
│   ├── Handle         # Connection handles
│   ├── MiniMap        # Mini-map navigation
│   └── Controls       # Operation controls
├── hooks/             # Custom hooks
│   ├── useCanvas      # Canvas operations
│   ├── useViewport    # Viewport control
│   ├── useSelection   # Selection control
│   └── useConnection  # Connection control
└── utils/             # Utilities
    ├── geometry       # Coordinate calculations
    ├── bezier         # Bezier curve calculations
    └── collision      # Collision detection
```

### Data Structures
Key TypeScript types:
```typescript
type Node = {
  id: string;
  position: { x: number; y: number };
  data: any; // Generic node data
  selected?: boolean;
  type?: string; // Node type for different renderers
};

type Edge = {
  id: string;
  source: string;
  target: string;
  data?: any; // Generic edge data
  selected?: boolean;
  type?: string; // Edge type (straight, bezier, etc.)
};

type Viewport = {
  x: number;
  y: number;
  zoom: number;
};
```

## Required Features

### High Priority
- Generic node rendering with customizable content
- Node dragging with mouse
- Edge rendering for connecting nodes
- Edge labels with editable text
- Zoom operations (mouse wheel and buttons)
- Pan operations (drag canvas)
- Selection functionality for nodes and edges
- Delete functionality for selected elements
- Connection functionality via handles

### Medium Priority
- Mini-map for navigation
- Control buttons (zoom, fit)

### Low Priority
- Grid display
- Snap-to-grid functionality

## Technical Stack

### Core Technologies
- **Build Tool**: Vite
- **Package Manager**: npm
- **Testing**: Vitest + React Testing Library
- **TypeScript**: Strict mode enabled
- **License**: MIT License
- **Target**: React 18+ compatibility

### Technical Requirements
- Full TypeScript support with strict mode
- Modern browser support (Chrome, Firefox, Safari, Edge)
- 100+ nodes performance target
- 60fps+ animations
- SVG + foreignObject rendering (with Canvas fallback for performance)

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Storybook
npm run storybook    # Start Storybook development server
npm run build-storybook # Build Storybook for production

# Testing
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
npm run coverage     # Generate test coverage

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check
```

## Development Phases

1. **Foundation**: Project setup, TypeScript types, basic canvas, viewport control
2. **Core Features**: Node rendering/dragging, edge rendering, selection, zoom/pan
3. **Connection Features**: Handle implementation, connection lines, Bezier curves
4. **React Flow Compatibility**: API compatibility layer, migration helpers

## React Flow Compatibility

This library aims to provide **partial React Flow API compatibility** for essential features:
- Basic node and edge rendering
- Drag and drop functionality
- Zoom and pan controls
- Selection handling
- Connection management

Focus is on core flow functionality, not complete API parity.

## Quality Targets

- Test coverage: 80%+
- TypeScript strict mode compliance
- Performance: smooth with 100+ nodes
- Bundle size: lightweight and tree-shakeable