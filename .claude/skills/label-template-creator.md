# Label Template Creator Skill

## Purpose
Build and improve Stickrr's label designer with advanced Canva-like functionality including drag-and-drop, rich editing features, and professional design tools.

## Context
Stickrr is a label maker application that currently has a basic template system. The goal is to create a professional-grade label designer with:
- Smooth drag-and-drop for all elements
- Multiple element types (text, shapes, boxes, images, icons)
- Layering and positioning controls
- Advanced styling options
- Real-time preview
- Template management

## Current Architecture Analysis

### Existing Components to Review:
1. **LabelDesigner** (`/components/LabelDesigner.tsx`) - Main designer interface
2. **Templates** (`/lib/templates.ts`) - Template definitions
3. **Types** (`/types/index.ts`) - Type definitions for labels
4. **Database Schema** - Labels table structure

### Current Limitations:
- Limited element types
- Basic positioning
- No drag-and-drop interface
- Simple text-only editing
- No layering system
- Limited styling options

## Feature Requirements

### Core Features (Canva-like):
1. **Drag & Drop System**
   - Drag elements from sidebar
   - Drag to reposition on canvas
   - Snap to grid/guides
   - Multi-select and group operations

2. **Element Types**
   - Text boxes (with rich formatting)
   - Shapes (rectangles, circles, lines, polygons)
   - Images (upload and position)
   - Icons from library
   - QR codes
   - Barcodes

3. **Editing Controls**
   - Resize handles
   - Rotation handles
   - Delete/duplicate
   - Copy/paste
   - Undo/redo stack
   - Alignment tools
   - Distribution tools

4. **Font & Typography System**
   - Google Fonts integration (100+ fonts)
   - Font size, weight, style controls
   - Letter spacing and line height
   - Text alignment and direction
   - Text effects (outline, shadow)
   - Font favorites/recently used
   - Custom font upload (for premium users)
   - Font pairing suggestions

5. **Photo & Image Management**
   - Drag-and-drop photo upload
   - Image cropping and filters
   - Resize and scale tools
   - Background removal (AI-powered)
   - Image library (stock photos)
   - Recent uploads quick access
   - Image optimization for labels

6. **User Asset Library**
   - Personal uploads storage
   - Organize into folders/collections
   - Tag and search assets
   - Favorite/star system
   - Usage tracking (where used)
   - Bulk upload/delete
   - Asset sharing (optional)
   - Cloud storage integration

7. **Styling Options**
   - Colors (fill, stroke, text)
   - Borders (width, style, color)
   - Shadows and effects
   - Opacity/transparency
   - Gradients
   - Color picker with history
   - Brand color palettes

5. **Layers Panel**
   - Layer list with preview
   - Reorder layers
   - Lock/unlock layers
   - Show/hide layers
   - Group/ungroup

6. **Canvas Controls**
   - Zoom in/out
   - Pan
   - Grid overlay
   - Rulers
   - Snap to grid/objects

## Technical Implementation

### Recommended Libraries:
- **react-dnd** or **dnd-kit** - Drag and drop
- **fabric.js** or **konva/react-konva** - Canvas manipulation
- **react-colorful** - Color picker
- **zustand** - State management for complex editor state
- **immer** - Immutable state updates

### Architecture Pattern:
```typescript
// Element base type
interface BaseElement {
  id: string
  type: 'text' | 'shape' | 'image' | 'icon' | 'qrcode' | 'barcode'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  zIndex: number
  locked: boolean
  visible: boolean
  opacity: number
}

// Specific element types extend base
interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number
  fontFamily: string
  fontWeight: number
  color: string
  textAlign: 'left' | 'center' | 'right'
  // ... more properties
}

// Canvas state
interface CanvasState {
  elements: BaseElement[]
  selectedIds: string[]
  zoom: number
  pan: { x: number; y: number }
  history: CanvasState[]
  historyIndex: number
}
```

### Component Structure:
```
/components/designer/
  ├── AdvancedDesigner.tsx          # Main container
  ├── Canvas/
  │   ├── DesignCanvas.tsx          # Canvas component
  │   ├── ElementRenderer.tsx       # Renders individual elements
  │   ├── SelectionBox.tsx          # Selection UI
  │   └── TransformHandles.tsx      # Resize/rotate handles
  ├── Sidebar/
  │   ├── ElementsPanel.tsx         # Element library
  │   ├── PropertiesPanel.tsx       # Selected element properties
  │   ├── LayersPanel.tsx           # Layers management
  │   └── TemplatesPanel.tsx        # Templates library
  ├── Toolbar/
  │   ├── MainToolbar.tsx           # Top toolbar
  │   ├── AlignmentTools.tsx        # Alignment buttons
  │   └── StyleTools.tsx            # Style controls
  └── hooks/
      ├── useCanvas.ts              # Canvas state management
      ├── useDragDrop.ts            # Drag & drop logic
      └── useHistory.ts             # Undo/redo
```

## Implementation Steps

### Phase 1: Foundation
1. Research and select canvas library (recommend react-konva for React)
2. Create basic canvas component with zoom/pan
3. Implement element rendering system
4. Set up state management (zustand store)

### Phase 2: Drag & Drop
1. Implement drag from sidebar to canvas
2. Add drag to reposition elements
3. Create selection system (single/multi-select)
4. Add transform handles (resize, rotate)

### Phase 3: Element Types
1. Implement text elements with formatting
2. Add shape elements (rect, circle, line)
3. Add image upload and positioning
4. Integrate icon library
5. Add QR code/barcode generation

### Phase 4: Editing Features
1. Build properties panel for element editing
2. Implement style controls (colors, borders, shadows)
3. Add alignment and distribution tools
4. Create undo/redo system

### Phase 5: Layers & Organization
1. Build layers panel
2. Implement layer reordering
3. Add lock/hide functionality
4. Create grouping system

### Phase 6: Polish & UX
1. Add keyboard shortcuts
2. Implement snap-to-grid
3. Add guides and rulers
4. Create template saving/loading
5. Optimize performance

## UI/UX Design Principles

### Brand & Marketing Focus:
- **Modern Aesthetics**: Clean, minimalist interface with ample white space
- **Smooth Animations**: 60fps transitions, micro-interactions on every action
- **Typography First**: Beautiful font pairings, emphasis on text tools
- **Visual Hierarchy**: Clear, intuitive layout with focus on creative tools
- **Professional Feel**: High-end design tool aesthetic (like Canva/Figma)

### Animation & Interactions:
```typescript
// Framer Motion for smooth animations
import { motion, AnimatePresence } from 'framer-motion'

// Example smooth transitions
const elementVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
}

// Smooth drag feedback
const dragFeedback = {
  whileDrag: {
    scale: 1.05,
    cursor: 'grabbing',
    transition: { duration: 0.1 }
  }
}
```

### Color Palette:
- **Primary**: Indigo (#6366F1) - Professional, modern
- **Accents**: Purple (#8B5CF6), Pink (#EC4899) - Creative energy
- **Neutrals**: Gray scale with subtle warmth
- **Backgrounds**: Soft gradients, light textures
- **Success/Error**: Clear, accessible status colors

### Typography Stack:
```css
/* Primary UI Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Display/Marketing */
font-family: 'Cal Sans', 'DM Sans', sans-serif;

/* Monospace (for measurements) */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Smooth Performance:
- **60 FPS Target**: All interactions must be buttery smooth
- **Optimistic Updates**: Instant UI feedback before server response
- **Loading States**: Skeleton screens, not spinners
- **Throttle/Debounce**: Smart input handling
- **Hardware Acceleration**: Use `transform` and `opacity` for animations

### Modern UI Components:
- **Glass morphism**: Subtle blur effects on panels
- **Neumorphism**: Soft shadows for depth (sparingly)
- **Gradient Accents**: Trendy color gradients
- **Icon System**: Lucide React for consistent iconography
- **Tooltips**: Helpful, non-intrusive guidance

## Design Patterns

### Canvas Rendering:
- Use React Konva Stage/Layer architecture
- Render elements as Konva shapes
- Handle events at shape level
- Use transformers for interactive editing
- GPU-accelerated rendering for smooth performance

### State Management:
```typescript
// Zustand store example
interface DesignerStore {
  // State
  elements: Element[]
  selectedIds: string[]
  zoom: number

  // Actions
  addElement: (element: Element) => void
  updateElement: (id: string, changes: Partial<Element>) => void
  deleteElements: (ids: string[]) => void
  selectElements: (ids: string[]) => void
  setZoom: (zoom: number) => void
  undo: () => void
  redo: () => void
}
```

### Drag & Drop:
- Use dnd-kit for accessibility
- Custom drag preview
- Drop zones for element addition
- Collision detection for snapping

## Performance Considerations
- Virtualize layers panel for many elements
- Debounce property updates
- Use React.memo for element renderers
- Implement canvas viewport culling
- Lazy load element libraries

## Integration Points

### With Existing Stickrr:
1. **Template System**: Extend current template structure
2. **Database**: Update label_data schema for new elements
3. **Export**: Update PDF export to handle new element types
4. **Library**: Save designs to user's library

### API Changes Needed:
- Update Label type to support new element structure
- Add endpoints for image upload
- Add icon library endpoints
- Update export/PDF generation logic

### Database Schema Extensions

#### User Assets Table:
```sql
CREATE TABLE user_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  asset_type VARCHAR(50) NOT NULL, -- 'image', 'font', 'icon'
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  width INTEGER, -- for images
  height INTEGER, -- for images
  folder_id UUID REFERENCES asset_folders(id),
  tags TEXT[], -- array of tags
  is_favorite BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_assets_user ON user_assets(user_id);
CREATE INDEX idx_user_assets_type ON user_assets(asset_type);
CREATE INDEX idx_user_assets_folder ON user_assets(folder_id);
```

#### Asset Folders Table:
```sql
CREATE TABLE asset_folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES asset_folders(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Asset Management APIs:

#### Upload & Management:
```typescript
// Upload asset
POST /api/assets/upload
Body: FormData with file + metadata
Response: { assetId, url, metadata }

// Get user assets
GET /api/assets?type=image&folder=<id>&search=<query>
Response: { assets: Asset[], total: number }

// Delete asset
DELETE /api/assets/:id

// Create folder
POST /api/assets/folders
Body: { name, parentId? }

// Update asset (tags, favorite, folder)
PATCH /api/assets/:id
Body: { tags?, isFavorite?, folderId? }
```

#### Font Management:
```typescript
// Get available fonts (Google Fonts API integration)
GET /api/fonts?category=<category>&search=<query>

// User font favorites
POST /api/fonts/favorites
Body: { fontFamily }
GET /api/fonts/favorites
```

### File Upload Implementation:
1. **Client**: Use `react-dropzone` for drag-and-drop
2. **Storage**: Cloudinary or AWS S3 with signed URLs
3. **Optimization**: Compress images (sharp/jimp)
4. **Security**: File type validation, size limits
5. **Limits**: 5MB free tier, 20MB premium

## User Experience Flow

### Creating a Label:
1. User selects label size
2. Chooses template or starts blank
3. Drags elements from sidebar
4. Positions and styles elements
5. Arranges layers
6. Saves to library
7. Exports or orders prints

### Editing Experience:
- Click element to select
- Drag handles to resize/rotate
- Click properties panel to style
- Use toolbar for quick actions
- Keyboard shortcuts for power users

## Testing Strategy
- Unit tests for element operations
- Integration tests for drag-drop
- E2E tests for complete workflows
- Performance testing with many elements
- Cross-browser testing

## Future Enhancements
- Collaborative editing
- Animation timeline
- Smart suggestions
- AI-powered design assistance
- Cloud asset library
- Advanced effects (blur, filters)
- Variable data for batch printing

## When to Use This Skill

Invoke this skill when:
- Building the advanced label designer
- Adding new element types
- Implementing drag-and-drop
- Creating editing tools
- Optimizing canvas performance
- Extending template system
- Adding design features

## Success Criteria
- Smooth 60fps drag and drop
- Intuitive Canva-like interface
- Support 100+ elements per canvas
- Responsive on mobile devices
- Professional-quality exports
- Fast save/load times
- Undo/redo works flawlessly
